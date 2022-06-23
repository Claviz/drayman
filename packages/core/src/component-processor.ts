require('source-map-support').install();
const consola = require('consola');
consola.setReporters(new consola.FancyReporter());

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
consola.wrapAll();

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

const initializeComponentInstance = async ({ componentInstanceId, browserCommands = [], serverCommands = [], extensionsPath, extensionsOptions, componentRootDir, componentName, componentOptions, componentNamePrefix = '' }) => {
    ComponentInstance.id = componentInstanceId;
    if (extensionsPath) {
        extensions = await require(path.join(process.cwd(), extensionsPath))(extensionsOptions);
    }
    const Browser = {};
    for (const command of browserCommands) {
        Browser[command] = async (data: any = {}, elements?: string[]) => new Promise<any>((resolve, reject) => {
            const newData = {};
            for (const key of Object.keys(data || {})) {
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
            sendMessage({ type: 'browserCommand', payload: { data: newData, callbackId, command, elements } });
        })
    }
    const Server = {};
    for (const command of serverCommands) {
        Server[command] = async (data: any = {}) => new Promise<any>((resolve, reject) => {
            const newData = {};
            for (const key of Object.keys(data || {})) {
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
            sendMessage({ type: 'serverCommand', payload: { data: newData, callbackId, command, } });
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
        const props = { ...initialProps } || {};
        let child_componentResult;
        try {
            child_componentResult = await (Object.values(
                require(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentKey}.js`))
            )[0] as any)({
                forceUpdate,
                props,
                EventHub,
                Components,
                Browser,
                Server,
                ComponentInstance,
                ...extensions.importable,
            });
        } catch (err) {
            console.error(err);
            child_componentResult = async () => {
                return errorComp(`Child component "${componentKey}" failed to initialize!`, err.message);
            }
        }
        let prevChildProps = {};
        return async (newProps: any) => {
            updatePreservingRef(props, newProps);
            let res;
            try {
                res = await child_componentResult({ prevProps: prevChildProps });
            } catch (err) {
                console.error(err);
                res = errorComp(`Child component "${componentKey}" failed to render!`, err.message);
            }
            prevChildProps = { ...props };
            return res;
        };
    }
    forceUpdate = async () => {
        updateId++;
        let compResult;
        let result;
        try {
            compResult = await componentResult({ prevProps });
            result = await render(compResult, childRenderer);
        } catch (err) {
            console.error(err)
            compResult = errorComp(`Component "${componentName}" failed to render!`, err.message);
            result = await render(compResult, childRenderer);
        }
        prevProps = { ...props };
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
        if (updateId === 1 && ComponentInstance.onInit) {
            await ComponentInstance.onInit();
        }
        // previouslySerializedTree = { ...result.tree };
        // previouslySerializedTree = JSON.parse(JSON.stringify(result.tree));
        // process?.send?.({ type: 'view', payload: { view: serializedView } });
        // await httpClient.sendView({
        //     view: serializedView,
        // });
        // }
    }
    let componentResult;
    try {
        componentResult = await (Object.values(
            await import(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentName}.js`))
        )[0] as any)({
            props,
            forceUpdate,
            EventHub,
            Components,
            Browser,
            Server,
            ComponentInstance,
            ...extensions.importable,
        })
    } catch (err) {
        console.error(err);
        componentResult = async () => {
            return errorComp(`Component "${componentName}" failed to initialize!`, err.message);
        }
    }

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

const errorComp = (errorHeader, error) => {
    return { "type": "div", "props": { "style": { "width": "100%", "height": "100%", "color": "rgba(0, 0, 0, 0.85)", "backgroundColor": "rgb(255, 242, 240)", "borderRadius": "2px", "border": "1px solid", "borderColor": "rgb(255, 204, 199)" }, "children": { "type": "div", "props": { "style": { "margin": "25px", "display": "flex", "gap": "10px" }, "children": [{ "type": "div", "props": { "style": { "fontSize": "16px" }, "children": { "type": "svg", "props": { "style": { "color": "rgb(255, 77, 79)", "height": "25px", "width": "25px" }, "viewBox": "64 64 896 896", "focusable": "false", "data-icon": "close-circle", "width": "1em", "height": "1em", "fill": "currentColor", "aria-hidden": "true", "children": [{ "type": "path", "props": { "d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { "type": "path", "props": { "d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] } } } }, { "type": "div", "props": { "style": { "display": "flex", "flexDirection": "column" }, "children": [{ "type": "div", "props": { "style": { "fontSize": "18px" }, "children": errorHeader } }, { "type": "div", "props": { "style": { "fontSize": "14px" }, "children": error } }] } }] } } } };
}