import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import ts from 'typescript';
import { spawn, Thread, Worker } from 'threads';
import { exec } from 'child_process';
import _ from 'lodash';

type ComponentLifecycleEventType = 'component_started' | 'component_ended';
type ComponentLifecycleStatus = 'processing' | 'success' | 'error';

type ComponentInstanceSnapshot = {
    id: string;
    parentId: null;
    rootId: string;
    ancestorIds: string;
    entityId: string;
    type: 'component';
    status: ComponentLifecycleStatus;
    startTime: Date;
    endTime: Date | null;
    durationMs: number | null;
    userId: any;
    branchId: string;
    connectionId: string;
    heapLimit: number;
    externalLimit: number;
    heapUsed: number;
    externalUsed: number;
    endReason: string | null;
};

type ComponentLifecycleEvent = ComponentInstanceSnapshot & {
    kind: 'lifecycle';
    lifecycleEvent: ComponentLifecycleEventType;
};

type ComponentWarnEvent = ComponentInstanceSnapshot & {
    kind: 'warn';
    message: string;
    error?: any;
};

type ComponentInstanceEvent = ComponentLifecycleEvent | ComponentWarnEvent;

type ComponentInstance = {
    heapLimit: number;
    componentName: string;
    heartbeatLimitMs: number;
    externalLimit: number;
    terminatingPromise: Promise<void> | null;
    emit: any;
    onComponentInstanceEvent?: (event: ComponentInstanceEvent) => void;
    lastHeartbeat: number;
    heapUsed: number;
    externalUsed: number;
    eventsSub?: { unsubscribe: () => void };
    component: string;
    startDate: Date;
    endDate: Date | null;
    durationMs: number | null;
    status: ComponentLifecycleStatus;
    endReason: string | null;
    worker: any;
    eventRequests: {
        [requestId: string]: {
            onSuccess: (data: { result: any }) => void,
            onError: (data: { err: any }) => void,
            canceled: boolean,
        };
    };
    connectionId: string;
    namespaceId: string;
    meta?: any;
};

type ComponentGarbageOpts = { skipOnDestroy?: boolean; endReason?: string | null; markedAt?: number };

const getNpmPackages = (nodeModulesPath) => {
    return new Promise<string[]>((resolve) => {
        exec(`npm ls -a -p`, { cwd: nodeModulesPath, }, function (error, stdout, stderr) {
            resolve(stdout ? stdout.split(/\r\n|\n|\r/).filter(x => path.isAbsolute(x)) : [])
        });
    });
}
const delay = (ms: number) => {
    return new Promise(r => setTimeout(r, ms));
};

const toMB = (x: number) => {
    return Math.round((x / 1048576) * 10) / 10;
}

const getPct = (num: number, den: number) => {
    return Math.min(100, Math.round((den > 0 ? (num / den) : 0) * 100));
}

const withTimeout = async <T>(p: Promise<T>, ms: number) => {
    return Promise.race([
        p,
        (async () => {
            await delay(ms);
            throw new Error(`Timed out after ${ms} ms`);
        })()
    ]);
}

const getComponentEndStatus = (endReason: string | null | undefined): ComponentLifecycleStatus => {
    return (endReason === 'resource limited' || endReason === 'worker failed') ? 'error' : 'success';
};

const buildComponentSnapshot = (
    componentInstanceId: string,
    instance: ComponentInstance,
): ComponentInstanceSnapshot => {
    return {
        id: componentInstanceId,
        parentId: null,
        rootId: componentInstanceId,
        ancestorIds: '',
        entityId: instance.componentName,
        type: 'component',
        status: instance.status || 'processing',
        startTime: instance.startDate,
        endTime: instance.endDate || null,
        durationMs: instance.durationMs ?? null,
        userId: instance.meta?.userId ?? null,
        branchId: instance.namespaceId,
        connectionId: instance.connectionId,
        heapLimit: instance.heapLimit,
        externalLimit: instance.externalLimit,
        heapUsed: instance.heapUsed,
        externalUsed: instance.externalUsed,
        endReason: instance.endReason ?? null,
    };
}

const buildComponentLifecycleEvent = (
    componentInstanceId: string,
    instance: ComponentInstance,
    lifecycleEvent: ComponentLifecycleEventType,
): ComponentLifecycleEvent => {
    return {
        ...buildComponentSnapshot(componentInstanceId, instance),
        kind: 'lifecycle',
        lifecycleEvent,
    };
}

const buildComponentWarnEvent = (
    componentInstanceId: string,
    instance: ComponentInstance,
    message: string,
    error?: any,
): ComponentWarnEvent => {
    return {
        ...buildComponentSnapshot(componentInstanceId, instance),
        kind: 'warn',
        message,
        error,
    };
}

const emitComponentInstanceEvent = (componentInstanceId: string, instance: ComponentInstance, event: ComponentInstanceEvent) => {
    try {
        instance.onComponentInstanceEvent?.(event);
    } catch (e) {
        console.warn(`Failed to emit componentInstanceEvent for ${componentInstanceId} (${instance.component})`, e);
    }
};

const warnComponentInstance = (componentInstanceId: string, instance: ComponentInstance | undefined, message: string, error?: any) => {
    if (instance) {
        emitComponentInstanceEvent(componentInstanceId, instance, buildComponentWarnEvent(componentInstanceId, instance, message, error));
    }
    if (error !== undefined) {
        console.warn(message, error);
    } else {
        console.warn(message);
    }
};

const safeParse = (value) => {
    if (typeof value !== 'string') {
        return value;
    }
    try {
        return JSON.parse(value);
    } catch {
        return {};
    }
}

const garbage = {
    connections: new Map<string, ComponentGarbageOpts>(),
    componentInstances: new Map<string, ComponentGarbageOpts>(),
};

const markConnectionGarbage = (connectionId: string, opts: ComponentGarbageOpts = {}) => {
    if (!connectionId) {
        return;
    }
    const prev = garbage.connections.get(connectionId) || {};
    garbage.connections.set(connectionId, {
        skipOnDestroy: Boolean(prev.skipOnDestroy || opts.skipOnDestroy),
        endReason: prev.endReason || opts.endReason || null,
        markedAt: prev.markedAt || opts.markedAt || Date.now(),
    });
    clearGarbage();
}

const markComponentGarbage = (componentInstanceId: string, opts: ComponentGarbageOpts = {}) => {
    if (!componentInstanceId) {
        return;
    }
    const prev = garbage.componentInstances.get(componentInstanceId) || {};
    garbage.componentInstances.set(componentInstanceId, {
        skipOnDestroy: Boolean(prev.skipOnDestroy || opts.skipOnDestroy),
        endReason: prev.endReason || opts.endReason || null,
        markedAt: prev.markedAt || opts.markedAt || Date.now(),
    });
    clearGarbage();
}

const clearGarbage = () => {
    const aliveIds = Object.keys(componentInstances);
    const fromConnections = new Map<string, ComponentGarbageOpts>();
    const remainingConnections = new Map<string, ComponentGarbageOpts>();
    const mergeGarbageOpts = (current: ComponentGarbageOpts | undefined, next: ComponentGarbageOpts) => {
        if (!current) {
            return next;
        }
        const currentAt = current.markedAt ?? Number.POSITIVE_INFINITY;
        const nextAt = next.markedAt ?? Number.POSITIVE_INFINITY;
        return currentAt <= nextAt ? current : next;
    };
    for (const [connectionId, connectionOpts] of garbage.connections) {
        let hasAliveInstance = false;
        for (const id of aliveIds) {
            const instance = componentInstances[id];
            if (!instance || instance.connectionId !== connectionId) {
                continue;
            }
            hasAliveInstance = true;
            fromConnections.set(id, mergeGarbageOpts(fromConnections.get(id), {
                skipOnDestroy: Boolean(connectionOpts.skipOnDestroy),
                endReason: connectionOpts.endReason || null,
                markedAt: connectionOpts.markedAt || Date.now(),
            }));
        }
        if (!hasAliveInstance) {
            remainingConnections.set(connectionId, connectionOpts);
        }
    }
    const explicit = new Map(garbage.componentInstances);
    const remainingExplicit = new Map<string, ComponentGarbageOpts>();
    const toTerminate = new Map<string, ComponentGarbageOpts>();
    for (const [id, opts] of fromConnections) {
        toTerminate.set(id, opts);
    }
    for (const [id, opts] of explicit) {
        const prev = toTerminate.get(id);
        const mergedOpts = mergeGarbageOpts(prev, opts);
        if (!componentInstances[id]) {
            remainingExplicit.set(id, mergedOpts);
            continue;
        }
        toTerminate.set(id, mergedOpts);
    }
    for (const [id, opts] of toTerminate) {
        const instance = componentInstances[id];
        if (!instance || instance.terminatingPromise) {
            continue;
        }
        terminateComponentInstance(id, opts);
    }
    garbage.componentInstances.clear();
    for (const [id, opts] of remainingExplicit) {
        garbage.componentInstances.set(id, opts);
    }
    garbage.connections.clear();
    for (const [connectionId, connectionOpts] of remainingConnections) {
        garbage.connections.set(connectionId, connectionOpts);
    }
};

async function terminateComponentInstance(componentInstanceId: string, opts: ComponentGarbageOpts = {}) {
    const instance = componentInstances[componentInstanceId];
    if (!instance) {
        return;
    }
    if (instance.terminatingPromise) {
        return instance.terminatingPromise;
    }
    instance.terminatingPromise = (async () => {
        for (const requestId of Object.keys(instance.eventRequests)) {
            try {
                instance.eventRequests[requestId].onError({ err: `Component instance was destroyed` });
            } catch { }
        }
        if (opts.endReason && !instance.endReason) {
            instance.endReason = opts.endReason;
        }
        instance.status = getComponentEndStatus(instance.endReason || opts.endReason);
        if (!opts.skipOnDestroy) {
            try {
                await withTimeout(instance.worker.handleDestroyComponentInstance(), 3000);
            } catch (e) {
                warnComponentInstance(componentInstanceId, instance, `Handle destroy component instance failed for ${componentInstanceId} (${instance.component})`, e);
            }
        }
        try {
            await withTimeout(Thread.terminate(instance.worker), 1000);
        } catch (e) {
            warnComponentInstance(componentInstanceId, instance, `Thread.terminate failed for ${componentInstanceId} (${instance.component})`, e);
        }
        try {
            instance.eventsSub?.unsubscribe?.();
        } catch (e) {
            warnComponentInstance(componentInstanceId, instance, `Failed to unsubscribe events for ${componentInstanceId} (${instance.component})`, e);
        }
        try {
            if (!instance.endDate) {
                instance.endDate = new Date();
                instance.durationMs = instance.startDate ? (instance.endDate.getTime() - instance.startDate.getTime()) : null;
            }
        } catch (_) { }
        const destroyedEvent = buildComponentLifecycleEvent(componentInstanceId, instance, 'component_ended');
        delete componentInstances[componentInstanceId];
        emitComponentInstanceEvent(componentInstanceId, instance, destroyedEvent);
        try {
            instance?.emit?.({
                type: 'componentInstanceDestroyed',
                payload: {},
                componentInstanceId,
            });
        } catch (e) {
            warnComponentInstance(componentInstanceId, instance, `Failed to emit componentInstanceDestroyed for ${componentInstanceId} (${instance.component})`, e);
        }
    })();

    return instance.terminatingPromise;
}

const heartbeatInterval = setInterval(() => {
    const now = Date.now();
    for (const [id, instance] of Object.entries(componentInstances)) {
        if (!instance || instance.terminatingPromise) {
            continue;
        }
        const limit = instance.heartbeatLimitMs;
        if (now - instance.lastHeartbeat > limit) {
            warnComponentInstance(id, instance, `Heartbeat limit reached (${limit} ms) — stopping ${id} (${instance.component})`);
            markComponentGarbage(id, { skipOnDestroy: true, endReason: 'resource limited' });
        }
    }
}, 1000);
if (typeof (heartbeatInterval as any).unref === 'function') {
    (heartbeatInterval as any).unref();
}

export const componentInstances: {
    [componentInstanceId: string]: ComponentInstance
} = {};

export const handleComponentEvent = ({ componentInstanceId, eventName, options, files, onSuccess, onError }) => {
    options = safeParse(options);
    const requestId = shortid.generate();
    const instance = componentInstances[componentInstanceId];
    if (instance) {
        instance.eventRequests[requestId] = { onSuccess, onError, canceled: false };
        instance.worker.handleComponentEvent({ eventName, requestId, options, files });
    } else {
        onError({ err: 'Component instance was not found.' });
    }

    return {
        requestId,
        cancel: () => {
            const current = componentInstances[componentInstanceId];
            if (!current) {
                return;
            }
            const req = current.eventRequests[requestId];
            if (!req) {
                return;
            }
            req.canceled = true;
            try {
                current.worker.cancelComponentEvent({ requestId });
            } catch {
                warnComponentInstance(componentInstanceId, current, `Failed to cancel component event ${eventName} (${requestId}) for ${componentInstanceId} (${current.component})`);
            }
        }
    };
}

export async function getElementsScriptPaths({ nodeModulesPath = null }) {
    nodeModulesPath = nodeModulesPath || path.join(process.cwd(), 'node_modules');
    const packagePaths = await getNpmPackages(nodeModulesPath);
    const paths = {};
    for (const packagePath of packagePaths) {
        const packageJsonPath = path.join(packagePath, 'package.json');
        const packageJson = await fs.readJSON(packageJsonPath, { throws: false });
        const elements = packageJson?.drayman?.elements || {};
        for (const element of Object.keys(elements)) {
            paths[element] = path.join(packagePath, elements[element].script);
        }
    }
    return paths;
}

export const onUpdateComponentInstanceProps = ({ componentInstanceId, options }) => {
    options = safeParse(options);
    const instance = componentInstances[componentInstanceId];
    if (!instance || instance.terminatingPromise) {
        return;
    }
    try {
        instance.worker.updateComponentInstanceProps({ options });
    } catch {
        warnComponentInstance(componentInstanceId, instance, `Failed to update props for component instance ${componentInstanceId} (${instance.component})`);
    }
};

export const onHandleBrowserCallback = ({ callbackId, data }) => {
    for (const [componentInstanceId, instance] of Object.entries(componentInstances)) {
        if (!instance || instance.terminatingPromise) {
            continue;
        }
        try {
            instance.worker.handleBrowserCallback({ callbackId, data });
        } catch {
            warnComponentInstance(componentInstanceId, instance, `Failed to handle browser callback ${callbackId} for component instance ${componentInstanceId} (${instance.component})`);
        }
    }
};

export const handleEventHubEvent = async ({ data, groupId = null, type, namespaceId = null }) => {
    for (const [componentInstanceId, instance] of Object.entries(componentInstances)) {
        if (!instance || instance.terminatingPromise || instance.namespaceId !== namespaceId) {
            continue;
        }
        try {
            instance.worker.handleEventHubEvent({ type, data, groupId });
        } catch {
            warnComponentInstance(componentInstanceId, instance, `Failed to handle event hub event ${type} for component instance ${componentInstanceId} (${instance.component})`);
        }
    }
};

export const saveComponent = async ({ script, outputFile, scriptPath }) => {
    const tsConfig = JSON.parse(
        await fs.readFile(
            path.join(
                __dirname,
                process.env.NODE_ENV === 'test' ? `../tests/component-processor.tsconfig.test.json` : `../component-processor.tsconfig.json`,
            ),
            'utf-8'
        )
    );
    let transpiledComponentScript = ts.transpileModule(script, {
        ...tsConfig,
        compilerOptions: {
            ...tsConfig.compilerOptions,
            sourceRoot: path.parse(scriptPath).dir
        },
        fileName: `${path.parse(outputFile).name}.tsx`
    });
    await fs.outputFile(outputFile, transpiledComponentScript.outputText);
}

export const onInitializeComponentInstance = async ({
    namespaceId = null,
    extensionsPath = null,
    extensionsOptions = null,
    logging = null,
    componentNamePrefix = '',
    componentName,
    componentRootDir,
    componentInstanceId,
    componentOptions,
    connectionId,
    emit,
    onComponentInstanceConsole,
    browserCommands,
    serverCommands,
    onEventHubEvent = null,
    onComponentInstanceEvent = null,
    heapLimit = 512,
    externalLimit = 512,
    heartbeatLimitMs = 3 * 1000,
    meta = null,
}) => {
    componentOptions = safeParse(componentOptions);
    let componentInstanceRegistered = false;
    const internalWorker = new Worker(`./component-processor.js`, {
        resourceLimits: {
            maxOldGenerationSizeMb: heapLimit,
        }
    });
    internalWorker.addEventListener('error', () => {
        if (componentInstanceRegistered) {
            const instance = componentInstances[componentInstanceId];
            if (!instance || instance.terminatingPromise) {
                return;
            }
        }
        markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'worker failed' });
    });
    const worker = await spawn(internalWorker);
    componentInstances[componentInstanceId] = {
        heartbeatLimitMs,
        heapLimit,
        externalLimit,
        componentName,
        worker,
        emit,
        onComponentInstanceEvent,
        lastHeartbeat: Date.now(),
        heapUsed: 0,
        externalUsed: 0,
        terminatingPromise: null,
        component: `${componentNamePrefix}${componentName}`,
        startDate: new Date(),
        endDate: null,
        durationMs: null,
        status: 'processing',
        endReason: null,
        meta,
        /**
         * Used to store user event requests (on button click, on input, etc.).
         */
        eventRequests: {},
        connectionId,
        namespaceId,
    };
    componentInstanceRegistered = true;
    const subscription = worker.events().subscribe({
        next: ({ type, payload }) => {
            /**
             * When there is a response to user event request.
             */
            if (type === 'response') {
                const { requestId, result, err } = payload;
                const req = componentInstances[componentInstanceId]?.eventRequests?.[requestId];
                if (req) {
                    try {
                        if (!req.canceled) {
                            err ? req.onError({ err }) : req.onSuccess({ result });
                        }
                    } catch {
                        warnComponentInstance(componentInstanceId, componentInstances[componentInstanceId], `Failed to process response for request ${requestId} in component instance ${componentInstanceId} (${componentInstances[componentInstanceId].component})`);
                    } finally {
                        delete componentInstances[componentInstanceId].eventRequests[requestId];
                    }
                }
                return;
            } else if (type === 'eventHubEvent') {
                const { eventPayload, groupId, type: eventType } = payload;
                handleEventHubEvent({ data: eventPayload, groupId, type: eventType, namespaceId });
                onEventHubEvent?.({ data: eventPayload, groupId, type: eventType, namespaceId });
            } else if (type === 'console') {
                const { text } = payload;
                onComponentInstanceConsole?.({ text });
            } else if (type === 'heartbeat') {
                const instance = componentInstances[componentInstanceId];
                if (!instance || instance.terminatingPromise) {
                    return;
                }
                const { heapStatistics } = payload;
                const heapUsedMB = toMB(heapStatistics.used_heap_size);
                const extUsedMB = toMB(heapStatistics.external_memory);
                const heapExceeded = heapUsedMB >= instance.heapLimit;
                const extExceeded = extUsedMB >= instance.externalLimit;
                instance.heapUsed = heapUsedMB;
                instance.externalUsed = extUsedMB;
                instance.lastHeartbeat = Date.now();
                if (heapExceeded || extExceeded) {
                    warnComponentInstance(componentInstanceId, instance, `Memory limit exceeded (heap: ${heapExceeded} ${heapUsedMB}/${instance.heapLimit}, external: ${extExceeded} ${extUsedMB}/${instance.externalLimit}) — stopping ${componentInstanceId} (${instance.component})`);
                    markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'resource limited' });
                }
            } else {
                try {
                    emit({ type, payload, componentInstanceId });
                } catch (e) {
                    warnComponentInstance(componentInstanceId, componentInstances[componentInstanceId], `Failed to emit event ${type} for ${componentInstanceId} (${componentInstances[componentInstanceId].component})`, e);
                }
            }
        },
        error: (err) => {
            const instance = componentInstances[componentInstanceId];
            if (!instance || instance.terminatingPromise) {
                return;
            }
            markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'worker failed' });
        },
        complete: () => {
            const instance = componentInstances[componentInstanceId];
            if (!instance || instance.terminatingPromise) {
                return;
            }
            markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'worker failed' });
        },
    });
    componentInstances[componentInstanceId].eventsSub = subscription;
    try {
        const initializePromise = worker.initializeComponentInstance({
            browserCommands,
            serverCommands,
            componentNamePrefix,
            componentName,
            componentRootDir,
            componentOptions,
            componentInstanceId,
            extensionsPath,
            extensionsOptions,
            logging,
        });
        initializePromise?.catch?.(() => {
            const instance = componentInstances[componentInstanceId];
            if (!instance || instance.terminatingPromise) {
                return;
            }
            markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'worker failed' });
        });
        const initializedEvent = buildComponentLifecycleEvent(componentInstanceId, componentInstances[componentInstanceId], 'component_started');
        emitComponentInstanceEvent(componentInstanceId, componentInstances[componentInstanceId], initializedEvent);
    } catch {
        markComponentGarbage(componentInstanceId, { skipOnDestroy: true, endReason: 'worker failed' });
    }
    clearGarbage();
}

export const onDisconnect = async ({ connectionId }) => {
    markConnectionGarbage(connectionId, { endReason: 'user stopped' });
};

export const onDestroyNamespace = async ({ namespaceId }) => {
    const instanceIds = Object.entries(componentInstances)
        .filter(([, instance]) => instance?.namespaceId === namespaceId)
        .map(([componentInstanceId]) => componentInstanceId);

    await Promise.all(instanceIds.map(componentInstanceId =>
        markComponentGarbage(componentInstanceId, { skipOnDestroy: false, endReason: 'server stopped' })
    ));
};


export const onDestroyComponentInstance = async ({ componentInstanceId }) => {
    markComponentGarbage(componentInstanceId, { skipOnDestroy: false, endReason: 'user stopped' });
};
