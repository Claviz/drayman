import { render, isEvent } from './utils';
import fs from 'fs';
import path from 'path';
import shortid from 'shortid';

import { compare } from 'fast-json-patch';

class EventHubClass {
    #handlers: {
        [eventName: string]: {
            func: any;
            groupId: any;
        }[];
    } = {};
    emit = async (type, eventPayload, groupId = null) => {
        await sendMessage({ type: 'eventHubEvent', payload: { eventPayload, groupId, type } });
    }
    on = (eventName, func, groupId = null) => {
        if (this.#handlers[eventName]) {
            this.#handlers[eventName].push({ func, groupId });
        } else {
            this.#handlers[eventName] = [{ func, groupId }];
        }
    }
    _execute = async (eventName, options, groupId = null) => {
        if (this.#handlers[eventName]) {
            for (const handler of this.#handlers[eventName].filter(x => x.groupId === groupId)) {
                await handler.func(options);
            }
        }
    }
}
class RouterClass {
    url: string;
    onRouteChange;
    navigate = async (path) => {
        sendMessage({ type: 'navigate', payload: { path } })
    }
}
const Router = new RouterClass();
const EventHub = new EventHubClass();
const componentInstanceId = process.argv[2];
let browserCallbacks: {
    [callbackId: string]: {
        callback: any;
        once: boolean;
    }
} = {};
// let tree = [];
let treeEvents: { [key: string]: any } = {};
let previouslySerializedTree = [];
// let view: { [key: string]: any } = {};
// let previouslySerializedView: { [key: string]: any } = {};
let forceUpdate: any;
// let httpClient;
let prevProps = {};
let props = {};
// const $meta = {};
let extensions: { importable: any } = { importable: null };
// const modalPrefix = `$$modal-`;

const serializeComponentInstanceOptions = (options: any) => {
    const serialized: { [key: string]: any } = {};
    if (!options) {
        return serialized;
    }
    for (const optionKey of Object.keys(options)) {
        serialized[optionKey] = isEvent(optionKey) ? null : options[optionKey];
    }
    return serialized;
}

const sendMessage = ({ type, payload }) => {
    process?.send?.({ type, payload, componentInstanceId });
}

const renderedComps: { [componentId: string]: { result: any, called?: boolean } } = {};

const initializeComponentInstance = async ({ extensionsPath, extensionsOptions, componentRootDir, componentName, componentOptions, location, isModal = false, componentNamePrefix = '' }) => {
    if (extensionsPath) {
        extensions = await require(path.join(process.cwd(), extensionsPath))(extensionsOptions);
    }
    Router.url = location.href;
    props = componentOptions || {};
    const componentNames = fs
        .readdirSync(componentRootDir)
        .filter(x => x
            .startsWith(componentNamePrefix)
        )
        .map(x => x
            .replace(componentNamePrefix, '')
            .replace('.tsx', '')
        );
    const Components: { [componentId: string]: any } = {};
    componentNames.forEach(x => Components[x] = x);
    const childRenderer = async (type: string, key: string, props: any) => {
        if (componentNames.includes(type)) {
            if (!renderedComps[key]) {
                const result = await createComponent(type, props);
                renderedComps[key] = { result };
            }
            renderedComps[key].called = true;
            return await renderedComps[key].result(props);
        }
        return null;
    }
    const createComponent = async (componentKey: string, initialProps: any) => {
        const props = { ...initialProps } || {};
        // const child_fnResult = require(path.join(process.cwd(), `./out/components/${componentKey}.tsx`));
        const child_fnResult = require(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentKey}.tsx`));
        const child_componentResult = await (Object.values(child_fnResult)[0] as any)({
            forceUpdate,
            props,
            UI,
            EventHub,
            Router,
            Components,
            ...extensions.importable,
            // isModal,
        });
        let prevChildProps = {};
        return async (newProps: any) => {
            updatePreservingRef(props, newProps);
            const res = await child_componentResult({ prevProps: prevChildProps });
            prevChildProps = { ...props };
            return res;
        };
    }
    const UI: DraymanComponentUI = {
        isModal,
        openModal: async (component, options, modalOptions) => {
            let onCloseCallbackId;
            if (modalOptions?.onClose) {
                onCloseCallbackId = `${shortid.generate()}`;
                browserCallbacks[onCloseCallbackId] = {
                    callback: modalOptions.onClose,
                    once: true,
                };
            }
            sendMessage({
                type: 'openModal',
                payload: {
                    component,
                    options: serializeComponentInstanceOptions(options),
                    onCloseCallbackId,
                    modalOptions: {
                        width: modalOptions?.width,
                        height: modalOptions?.height,
                    }
                }
            })
        },
        closeModal: async (data: any) => {
            sendMessage({ type: 'closeModal', payload: { data }, });
        },
        openWindow: async (url: string, windowName: string, windowFeatures: any) => {
            sendMessage({ type: 'openWindow', payload: { url, windowName, windowFeatures }, });
        },
        copyToClipboard: async (text: string) => {
            sendMessage({ type: 'copyToClipboard', payload: { text } });
            // await httpClient.copyToClipboard({
            //     value,
            // });
        },
        openSnackBar: async (message: string, options: any, onClose: any) => {
            let onCloseCallbackId;
            if (onClose) {
                onCloseCallbackId = shortid.generate();
                browserCallbacks[onCloseCallbackId] = {
                    callback: onClose,
                    once: true,
                };
            }
            sendMessage({ type: 'openSnackBar', payload: { message, options, onCloseCallbackId } });
            // await httpClient.openSnackBar({
            //     message,
            //     options: { ...options, callbackId },
            // });
        },
    }
    forceUpdate = async () => {
        const compResult = await componentResult({ prevProps });
        prevProps = { ...props };
        const result = await render(compResult, childRenderer);
        for (const key of Object.keys(renderedComps)) {
            if (!renderedComps[key].called) {
                delete renderedComps[key];
            } else {
                renderedComps[key].called = false;
            }
        }
        treeEvents = result.events;
        // if (result?.tree?.length) {
        // tree = result.tree;
        // const serializedTree = [];
        // // const serializedView: { [key: string]: any } = {};
        // const recurSerialize = (tree) => {
        //     for (const element of tree) {
        //         element.options = serializeComponentInstanceOptions(element.options);
        //         recurSerialize(element.children);
        //     }
        // }
        // recurSerialize(tree);
        // for (const key of Object.keys(view)) {
        //     serializedView[key] = {
        //         ...view[key],
        //         options: serializeComponentInstanceOptions(view[key].options),
        //     };
        // }
        // const viewKeys = Object.keys(view);
        // for (const key of Object.keys(renderedComps)) {
        //     if (!viewKeys.some(x => x.startsWith(`${key}.`))) {
        //         delete renderedComps[key];
        //     }
        // }

        // const viewArr = Object.keys(serializedView || {}).map(x => ({ ...serializedView[x], key: x }));
        // const viewTree = arrayToTree(viewArr, { id: 'key', parentId: 'parent', dataField: null, });

        // const delta = jsondiff.diff(previouslySerializedTree, result.tree);
        const delta = compare(previouslySerializedTree, result.tree);
        sendMessage({ type: 'view', payload: { view: delta } });
        // previouslySerializedTree = { ...result.tree };
        previouslySerializedTree = JSON.parse(JSON.stringify(result.tree));
        // process?.send?.({ type: 'view', payload: { view: serializedView } });
        // await httpClient.sendView({
        //     view: serializedView,
        // });
        // }
    }
    const fnResult = require(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentName}.tsx`));
    const componentResult = await (Object.values(fnResult)[0] as any)({
        props,
        forceUpdate,
        UI,
        EventHub,
        Router,
        // EventHub,
        ...extensions.importable,
        // isModal,
    });

    await forceUpdate();
}

// const handleEventHubEvent = async ({ type, data }) => {
//     await EventHub._execute(type, data);
// }

const handleBrowserCallback = async ({ callbackId, data }) => {
    if (browserCallbacks[callbackId]) {
        if (browserCallbacks[callbackId].callback) {
            await browserCallbacks[callbackId].callback(data);
        }
        if (browserCallbacks[callbackId].once) {
            delete browserCallbacks[callbackId];
        }
    }
}

const updatePreservingRef = (obj: any, newObj: any) => {
    for (const key of Object.keys(obj)) {
        if (!newObj[key]) {
            delete obj[key];
        }
    }
    for (const key of Object.keys(newObj)) {
        obj[key] = newObj[key];
    }
}

const updateComponentInstanceProps = async ({ options }) => {
    updatePreservingRef(props, options);
    await forceUpdate();

}

const handleComponentEvent = async ({ requestId, options, files, eventName }: { requestId: any; options: any; files: any; eventName: any; }) => {
    try {
        if (treeEvents[eventName]) {
            const result = await treeEvents[eventName](options || {}, files || []);
            sendMessage({ type: 'response', payload: { requestId, result } });
            // process?.send?.({ type: 'response', payload: { requestId, result } });
        }
    } catch (err) {
        console.error(err);
        sendMessage({ type: 'response', payload: { requestId, err } });
        // process?.send?.({ type: 'response', payload: { requestId, err } });
    }
}

const handleEventHubEvent = async ({ type, data, groupId }) => {
    await EventHub._execute(type, data, groupId);
}

const handleLocationChange = async ({ location }) => {
    const previousUrl = Router.url;
    Router.url = location.href;
    if (Router.onRouteChange) {
        await Router.onRouteChange({ previousUrl });
    }
}

process.on('message', async (message) => {
    const { type, payload } = message;
    switch (type) {
        case 'init':
            await initializeComponentInstance(payload);
            return;
        case 'updateComponentInstanceProps':
            await updateComponentInstanceProps(payload);
            return;
        case 'handleLocationChange':
            await handleLocationChange(payload);
            return;
        case 'handleBrowserCallback':
            await handleBrowserCallback(payload);
        case 'componentEvent':
            await handleComponentEvent(payload);
            return;
        case 'eventHubEvent':
            await handleEventHubEvent(payload);
            return;
    }
});