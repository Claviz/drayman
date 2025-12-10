require('source-map-support').install();
const consola = require('consola');
consola.setReporters(new consola.FancyReporter());

import { render, isEvent } from './utils';
import fs from 'fs';
import path from 'path';
import shortid from 'shortid';
import v8 from 'v8';

import { expose } from 'threads/worker'
import { Observable, Subject } from 'threads/observable'

let subject = new Subject();
import { Writable } from 'stream';
const sendMessage = ({ type, payload }) => {
    subject.next({ type, payload });
}
const portWritable = new Writable({
    write(chunk, encoding, callback) {
        sendMessage({ type: 'console', payload: { text: chunk.toString() } })
        callback();
    },
});
process.stdout.write = process.stderr.write = portWritable.write.bind(portWritable);
consola.wrapAll();

setInterval(() => {
    sendMessage({
        type: 'heartbeat',
        payload: {
            heapStatistics: v8.getHeapStatistics(),
        },
    });
}, 500);

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
const activeRequests = new Map<string, AbortController>();
const renderedComps: Record<string, RenderedEntry> = {};
type Renderer = (props: any) => Promise<any>;
type CreatedComponent = { renderer: Renderer; childInstance: any };
type RenderedEntry = {
    ready?: Promise<CreatedComponent>;
    renderer?: Renderer;
    generation: number;
    cachedResult?: any;
    childInstance?: any;
    childInitCalled?: boolean;
    childDestroyed?: boolean;
};
const forceUpdateInitiators: Set<string> = new Set();
const pendingChildUpdates: Set<string> = new Set();
let currentGeneration = 0;
let browserCallbacks: {
    [callbackId: string]: {
        callback: any;
        once: boolean;
    }
} = {};
let treeEvents: { [key: string]: any } = {};
let eventOwners: Record<string, string> = {};
let forceUpdate: any;
let prevProps = {};
let props = {};
let defaultProps = {};
let extensions: { importable: any } = { importable: null };
let updateId = 0;
let sentView;
let onInitRan = false;

const isAbortError = (err: any) => {
    const msg = String(err?.message || err || '');
    return /aborted/i.test(msg) || msg.includes('Exclusive request aborted');
};
const isInvalidParamsError = (err: any) => String(err?.message || err || '').includes('Invalid Params');
const createChildComponentInstance = (cacheKey: string) => ({
    id: `${ComponentInstance.id}:${cacheKey}`,
    parentId: ComponentInstance.id,
    __draymanDestroyed: false,
});
const runChildOnInit = (entry: RenderedEntry) => {
    if (!entry.childInitCalled && entry.childInstance?.onInit) {
        entry.childInitCalled = true;
        queueMicrotask(async () => {
            if (entry.childDestroyed || entry.childInstance?.__draymanDestroyed) {
                return;
            }
            try {
                await entry.childInstance.onInit();
            } catch (err) {
                if (!isAbortError(err) && !isInvalidParamsError(err)) {
                    console.error(err);
                }
            }
        });
    }
};
const runChildOnDestroy = async (entry: RenderedEntry) => {
    if (entry.childDestroyed) {
        return;
    }
    entry.childDestroyed = true;
    if (entry.childInstance) {
        entry.childInstance.__draymanDestroyed = true;
    }
    if (entry.childInstance?.onDestroy) {
        await entry.childInstance.onDestroy();
    }
};
const guardEventsWithInstance = (node: any, instance: any) => {
    if (!node) return;
    if (Array.isArray(node)) {
        node.forEach(child => guardEventsWithInstance(child, instance));
        return;
    }
    if (typeof node !== 'object') return;

    const wrap = (fn: any) => {
        if (typeof fn !== 'function') return fn;
        return async (...args: any[]) => {
            if (instance?.__draymanDestroyed) return;
            try {
                return await fn(...args);
            } catch (err) {
                if (instance?.__draymanDestroyed || isAbortError(err) || isInvalidParamsError(err)) return;
                throw err;
            }
        };
    };

    const props = node.props;
    if (props && typeof props === 'object') {
        for (const key of Object.keys(props)) {
            if (isEvent(key)) {
                const val = props[key];
                if (typeof val === 'function') {
                    props[key] = wrap(val);
                } else if (Array.isArray(val) && typeof val[0] === 'function') {
                    props[key] = [wrap(val[0]), val[1]];
                }
            }
        }
        if (props.children) {
            guardEventsWithInstance(props.children, instance);
        }
    }
};
const findRenderedEntryByEvent = (eventName: string): RenderedEntry | undefined => {
    const cacheKey = eventOwners[eventName];
    if (!cacheKey) return undefined;
    return renderedComps[cacheKey];
};


const buildCommandProxy = (commands: string[], type: 'browserCommand' | 'serverCommand') => {
    const proxy: Record<string, any> = {};
    for (const command of commands) {
        proxy[command] = async (data: any = {}, elements?: string[]) => new Promise<any>((resolve) => {
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
            const payload: any = { data: newData, callbackId, command };
            if (type === 'browserCommand') {
                payload.elements = elements;
            }
            sendMessage({ type, payload });
        });
    }
    return proxy;
};

const initializeComponentInstance = async ({ componentInstanceId, browserCommands = [], serverCommands = [], extensionsPath, extensionsOptions, componentRootDir, componentName, componentOptions, componentNamePrefix = '' }) => {
    onInitRan = false;
    ComponentInstance.id = componentInstanceId;
    if (extensionsPath) {
        extensions = await require(path.join(process.cwd(), extensionsPath))(extensionsOptions);
    }
    const Browser = buildCommandProxy(browserCommands, 'browserCommand');
    const Server = buildCommandProxy(serverCommands, 'serverCommand');
    props = componentOptions || {};
    for (const key of Object.keys(props)) {
        if (isEvent(key)) {
            props[key] = async (data) => {
                sendMessage({ type: 'rootEvent', payload: { event: key, data } })
            }
        }
    }
    const componentNames = fs
        .readdirSync(componentRootDir)
        .filter(x => x.startsWith(componentNamePrefix) && x.endsWith('.js'))
        .map(x => x
            .replace(componentNamePrefix, '')
            .replace('.js', '')
        );
    const Components: { [componentId: string]: any } = {};
    componentNames.forEach(x => Components[x] = x);

    const resolveRenderedEntry = async (type: string, key: string, initialProps: any) => {
        const cacheKey = `${type}::${key}`;
        let entry = renderedComps[cacheKey];
        if (!entry) {
            const ready = (async () => await createComponent(type, initialProps, cacheKey))();
            entry = renderedComps[cacheKey] = { ready, generation: currentGeneration };
        }
        if (!entry.renderer) {
            const created = await entry.ready;
            entry.renderer = created.renderer;
            entry.childInstance = created.childInstance;
        }
        entry.generation = currentGeneration;
        return entry;
    };

    const childRenderer = async (type: string, key: string, props: any, parentDirty = false) => {
        if (!componentNames.includes(type)) {
            return null;
        }
        const cacheKey = `${type}::${key}`;
        const entry = await resolveRenderedEntry(type, key, props);

        const iAmDirty = parentDirty || forceUpdateInitiators.has(cacheKey);

        if (!iAmDirty && entry.cachedResult !== undefined) {
            return { result: entry.cachedResult, isDirty: false, cacheKey };
        }

        const result = await entry.renderer(props);
        runChildOnInit(entry);
        entry.cachedResult = result;
        return { result, isDirty: iAmDirty, cacheKey };
    };

    const createComponent = async (componentKey: string, initialProps: any, cacheKey: string) => {
        const props = { ...initialProps };
        let defaultProps = {};
        let child_componentResult;
        const childComponentInstance = createChildComponentInstance(cacheKey);

        const scopedForceUpdate = async () => {
            pendingChildUpdates.add(cacheKey);
            await forceUpdate(true);
        };

        try {
            const imported = await import(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentKey}.js`));
            defaultProps = imported.defaultProps || {};
            for (const key of Object.keys(defaultProps)) {
                if (!props[key]) {
                    props[key] = defaultProps[key];
                }
            }
            child_componentResult = await imported.component({
                forceUpdate: scopedForceUpdate,
                props,
                EventHub,
                Components,
                Browser,
                Server,
                ComponentInstance: childComponentInstance,
                ...extensions.importable,
            });
            if (childComponentInstance.__draymanDestroyed) {
                return { renderer: async () => null, childInstance: childComponentInstance };
            }
        } catch (err) {
            if (childComponentInstance.__draymanDestroyed || isAbortError(err)) {
                child_componentResult = async () => null;
            } else {
                console.error(err);
                child_componentResult = async () => {
                    return errorComp(`Child component "${componentKey}" failed to initialize!`, err.message);
                };
            }
        }
        let prevChildProps = { ...defaultProps };
        const renderer = async (newProps: any) => {
            updatePreservingRef(props, newProps);
            let res;
            try {
                for (const key of Object.keys(defaultProps)) {
                    if (!props[key]) {
                        props[key] = defaultProps[key];
                    }
                }
                if (childComponentInstance.__draymanDestroyed) {
                    return null;
                }
                res = await child_componentResult({ prevProps: prevChildProps });
                guardEventsWithInstance(res, childComponentInstance);
            } catch (err) {
                if (childComponentInstance.__draymanDestroyed || isAbortError(err)) {
                    return null;
                }
                console.error(err);
                res = errorComp(`Child component "${componentKey}" failed to render!`, err.message);
            }
            prevChildProps = { ...props };
            return res;
        };
        return { renderer, childInstance: childComponentInstance };
    }
    let cachedParentResult: any = null;
    let scheduledRender: ReturnType<typeof setTimeout> | null = null;
    let renderPromise: Promise<void> | null = null;
    let resolveRender: (() => void) | null = null;
    let rootNeedsUpdate = false;
    let inFlightRender: Promise<void> | null = null;

    const doForceUpdate = async () => {
        const currentEventOwners: Record<string, string> = {};
        for (const key of pendingChildUpdates) {
            forceUpdateInitiators.add(key);
        }
        pendingChildUpdates.clear();

        updateId++;
        currentGeneration++;
        let compResult;
        let result;
        try {
            for (const key of Object.keys(defaultProps)) {
                if (!props[key]) {
                    props[key] = defaultProps[key];
                }
            }
            const isRootInitiated = rootNeedsUpdate || forceUpdateInitiators.size === 0;
            rootNeedsUpdate = false;

            if (isRootInitiated || !cachedParentResult) {
                compResult = await componentResult({ prevProps });
                cachedParentResult = compResult;
            } else {
                compResult = cachedParentResult;
            }
            result = await render(compResult, childRenderer, [], {}, '', isRootInitiated, '', currentEventOwners);
        } catch (err) {
            console.error(err)
            compResult = errorComp(`Component "${componentName}" failed to render!`, err.message);
            result = await render(compResult, childRenderer, [], {}, '', true, '', currentEventOwners);
        }
        prevProps = { ...props };
        for (const key of Object.keys(renderedComps)) {
            if (renderedComps[key].generation !== currentGeneration) {
                await runChildOnDestroy(renderedComps[key]);
                delete renderedComps[key];
            }
        }
        treeEvents = result.events;
        eventOwners = result.eventOwners || currentEventOwners;
        const newView = JSON.stringify(result.tree);
        if (sentView !== newView) {
            sentView = newView;
            sendMessage({ type: 'view', payload: { view: result.tree, updateId } });
        }
        forceUpdateInitiators.clear();
    }

    const runSerializedRender = async () => {
        if (inFlightRender) {
            try {
                await inFlightRender;
            } catch {
            }
        }
        const currentRender = doForceUpdate();
        inFlightRender = currentRender.finally(() => {
            if (inFlightRender === currentRender) {
                inFlightRender = null;
            }
        });
        await inFlightRender;
    };

    forceUpdate = async (isChildUpdate = false) => {
        if (!isChildUpdate) {
            rootNeedsUpdate = true;
        }

        if (scheduledRender) {
            clearTimeout(scheduledRender);
        }
        if (!renderPromise) {
            renderPromise = new Promise(resolve => {
                resolveRender = resolve;
            });
        }

        const currentPromise = renderPromise;

        scheduledRender = setTimeout(async () => {
            scheduledRender = null;
            try {
                await runSerializedRender();
            } finally {
                if (resolveRender) {
                    resolveRender();
                    resolveRender = null;
                    renderPromise = null;
                }
            }
        }, 50);

        return currentPromise;
    }
    let componentResult;
    try {
        const imported = await import(path.join(process.cwd(), componentRootDir, `${componentNamePrefix}${componentName}.js`));
        defaultProps = imported.defaultProps || {};
        prevProps = { ...defaultProps };
        for (const key of Object.keys(defaultProps)) {
            if (!props[key]) {
                props[key] = defaultProps[key];
            }
        }
        componentResult = await (imported.component as any)({
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

    await runSerializedRender();
    if (!onInitRan && ComponentInstance.onInit) {
        onInitRan = true;
        console.log('onInit called');
        await ComponentInstance.onInit();
    }
}

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
    for (const key of Object.keys(props)) {
        if (isEvent(key)) {
            props[key] = async (data) => {
                sendMessage({ type: 'rootEvent', payload: { event: key, data } })
            }
        }
    }
    await forceUpdate();

}

const handleComponentEvent = async ({ requestId, options, files, eventName }: { requestId: any; options: any; files: any; eventName: any; }) => {
    try {
        const entry = findRenderedEntryByEvent(eventName);
        if (entry?.childInstance?.__draymanDestroyed || entry?.childDestroyed) {
            sendMessage({ type: 'response', payload: { requestId, result: null } });
            return;
        }
        if (treeEvents[eventName]) {
            const abortContoller = new AbortController();
            const { signal } = abortContoller;
            activeRequests.set(requestId, abortContoller);
            const result = await treeEvents[eventName](options || {}, files || [], signal);
            sendMessage({ type: 'response', payload: { requestId, result } });
        }
    } catch (err) {
        if (!isAbortError(err) && !isInvalidParamsError(err)) {
            console.error(err);
        }
        sendMessage({ type: 'response', payload: { requestId, err } });
    } finally {
        activeRequests.delete(requestId);
    }
};

const handleEventHubEvent = async ({ type, data, groupId }) => {
    await EventHub._execute(type, data, groupId);
}

const handleDestroyComponentInstance = async () => {
    for (const key of Object.keys(renderedComps)) {
        await runChildOnDestroy(renderedComps[key]);
        delete renderedComps[key];
    }
    eventOwners = {};
    treeEvents = {};
    if (ComponentInstance.onDestroy) {
        await ComponentInstance.onDestroy();
    }
};

const cancelComponentEvent = async ({ requestId }) => {
    if (activeRequests.has(requestId)) {
        activeRequests.get(requestId).abort();
        activeRequests.delete(requestId);
    }
};

expose({
    initializeComponentInstance,
    updateComponentInstanceProps,
    handleBrowserCallback,
    handleComponentEvent,
    handleEventHubEvent,
    handleDestroyComponentInstance,
    cancelComponentEvent,
    events() {
        return Observable.from(subject)
    }
})

const errorComp = (errorHeader, error) => {
    return { "type": "div", "props": { "style": { "width": "100%", "height": "100%", "color": "rgba(0, 0, 0, 0.85)", "backgroundColor": "rgb(255, 242, 240)", "borderRadius": "2px", "border": "1px solid", "borderColor": "rgb(255, 204, 199)" }, "children": { "type": "div", "props": { "style": { "margin": "25px", "display": "flex", "gap": "10px" }, "children": [{ "type": "div", "props": { "style": { "fontSize": "16px" }, "children": { "type": "svg", "props": { "style": { "color": "rgb(255, 77, 79)", "height": "25px", "width": "25px" }, "viewBox": "64 64 896 896", "focusable": "false", "data-icon": "close-circle", "width": "1em", "height": "1em", "fill": "currentColor", "aria-hidden": "true", "children": [{ "type": "path", "props": { "d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { "type": "path", "props": { "d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] } } } }, { "type": "div", "props": { "style": { "display": "flex", "flexDirection": "column" }, "children": [{ "type": "div", "props": { "style": { "fontSize": "18px" }, "children": errorHeader } }, { "type": "div", "props": { "style": { "fontSize": "14px" }, "children": error } }] } }] } } } };
}
