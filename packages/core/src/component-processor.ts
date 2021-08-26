const pe = require('pretty-error').start();
pe.withoutColors();
import { render, isEvent } from './utils';
import fs from 'fs';
import path from 'path';
import shortid from 'shortid';

// import { compare } from 'fast-json-patch';
import { expose } from 'threads/worker'
import { Observable, Subject } from 'threads/observable'

let subject = new Subject();
import { Writable } from 'stream';
const sendMessage = ({ type, payload }) => {
    subject.next({ type, payload });
    // port.postMessage({ type, payload, componentInstanceId: initData.componentInstanceId })
    // process?.send?.({ type, payload, componentInstanceId });
}
const portWritable = new Writable({
    write(chunk, encoding, callback) {
        sendMessage({ type: 'console', payload: { text: chunk.toString() } })
        // port.postMessage(chunk.toString());
        callback();
    },
});
process.stdout.write = process.stderr.write = portWritable.write.bind(portWritable);
class EventHubClass {
    #handlers: {
        [eventName: string]: {
            func: any;
            groupId: any;
        }[];
    } = {};
    emit = async (type, eventPayload, groupId = null) => {
        sendMessage({ type: 'eventHubEvent', payload: { eventPayload, groupId, type } });
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
const EventHub = new EventHubClass();
const ComponentInstance: any = {};
// const componentInstanceId = process.argv[2];
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
let updateId = 0;

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

const renderedComps: { [componentId: string]: { result: any, called?: boolean } } = {};

const initializeComponentInstance = async ({ componentInstanceId, browserCommands = [], extensionsPath, extensionsOptions, componentRootDir, componentName, componentOptions, componentNamePrefix = '' }) => {
    ComponentInstance.id = componentInstanceId;
    if (extensionsPath) {
        extensions = await require(path.join(process.cwd(), extensionsPath))(extensionsOptions);
    }
    const Browser = {};
    for (const command of browserCommands) {
        Browser[command] = async (data: any = {}) => new Promise<any>((resolve, reject) => {
            const newData = {};
            for (const key of Object.keys(data)) {
                if (typeof data[key] === 'function') {
                    const callbackId = shortid.generate();
                    newData[key] = callbackId;
                    browserCallbacks[callbackId] = {
                        callback: async (response) => await data[key](response),
                        once: false,
                    };
                } else {
                    newData[key] = data[key];
                }
            }
            const callbackId = shortid.generate();
            browserCallbacks[callbackId] = {
                callback: (response) => resolve(response),
                once: true,
            };
            sendMessage({ type: 'browserCommand', payload: { data: newData, callbackId, command } });
        })
    }
    props = componentOptions || {};
    const componentNames = fs
        .readdirSync(componentRootDir)
        .filter(x => x.startsWith(componentNamePrefix) && x.endsWith('.js'))
        .map(x => x
            .replace(componentNamePrefix, '')
            .replace('.js', '')
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
        pe.alias(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentKey}.js`), `${componentKey}.js`);
        // pe.skip(function (traceLine, lineNumber) {
        //     if (traceLine.file !== `${componentNamePrefix}${componentKey}.tsx`) {
        //         return true;
        //     }
        // });
        const props = { ...initialProps } || {};
        // const child_fnResult = require(path.join(process.cwd(), `./out/components/${componentKey}.tsx`));
        const child_fnResult = require(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentKey}.js`));
        const child_componentResult = await (Object.values(child_fnResult)[0] as any)({
            forceUpdate,
            props,
            EventHub,
            Components,
            Browser,
            ComponentInstance,
            ...extensions.importable,
        });
        let prevChildProps = {};
        return async (newProps: any) => {
            updatePreservingRef(props, newProps);
            const res = await child_componentResult({ prevProps: prevChildProps });
            prevChildProps = { ...props };
            return res;
        };
    }
    forceUpdate = async () => {
        updateId++;
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
        // const delta = compare(previouslySerializedTree, result.tree);
        sendMessage({ type: 'view', payload: { view: result.tree, updateId } });
        // previouslySerializedTree = { ...result.tree };
        // previouslySerializedTree = JSON.parse(JSON.stringify(result.tree));
        // process?.send?.({ type: 'view', payload: { view: serializedView } });
        // await httpClient.sendView({
        //     view: serializedView,
        // });
        // }
    }
    const fnResult = await import(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentName}.js`));
    const componentResult = await (Object.values(fnResult)[0] as any)({
        props,
        forceUpdate,
        EventHub,
        Components,
        Browser,
        ComponentInstance,
        ...extensions.importable,
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

const handleDestroyComponentInstance = async () => {
    if (ComponentInstance.onDestroy) {
        await ComponentInstance.onDestroy();
    }
}

expose({
    initializeComponentInstance,
    updateComponentInstanceProps,
    handleBrowserCallback,
    handleComponentEvent,
    handleEventHubEvent,
    handleDestroyComponentInstance,
    events() {
        return Observable.from(subject)
    }
})