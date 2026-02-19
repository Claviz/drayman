import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import ts from 'typescript';
import { spawn, Thread, Worker } from 'threads';
import { exec } from 'child_process';
import _ from 'lodash';

type ComponentInstance = {
    heapLimit: number;
    componentName: string;
    heartbeatLimitMs: number;
    externalLimit: number;
    terminatingPromise: Promise<void> | null;
    emit: any;
    lastHeartbeat: number;
    heapUsed: number;
    externalUsed: number;
    eventsSub?: { unsubscribe: () => void };
    component: string;
    startDate: Date;
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

type ComponentGarbageOpts = { skipOnDestroy?: boolean };

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
    connections: new Set<string>(),
    componentInstances: new Map<string, ComponentGarbageOpts>(),
};

const markConnectionGarbage = (connectionId: string) => {
    garbage.connections.add(connectionId);
    clearGarbage();
}

const markComponentGarbage = (componentInstanceId: string, opts: ComponentGarbageOpts = {}) => {
    const prev = garbage.componentInstances.get(componentInstanceId) || {};
    garbage.componentInstances.set(componentInstanceId, {
        skipOnDestroy: Boolean(prev.skipOnDestroy || opts.skipOnDestroy),
    });
    clearGarbage();
}

const clearGarbage = () => {
    const aliveIds = Object.keys(componentInstances);
    const fromConnections = new Map<string, ComponentGarbageOpts>();
    for (const id of aliveIds) {
        const instance = componentInstances[id];
        if (instance && garbage.connections.has(instance.connectionId)) {
            fromConnections.set(id, { skipOnDestroy: false });
        }
    }
    const explicit = new Map(garbage.componentInstances);
    const toTerminate = new Map<string, ComponentGarbageOpts>();
    for (const [id, opts] of fromConnections) {
        toTerminate.set(id, { skipOnDestroy: Boolean(opts.skipOnDestroy) });
    }
    for (const [id, opts] of explicit) {
        const prev = toTerminate.get(id) || { skipOnDestroy: false };
        toTerminate.set(id, { skipOnDestroy: Boolean(prev.skipOnDestroy || opts.skipOnDestroy) });
    }
    for (const [id, opts] of toTerminate) {
        const instance = componentInstances[id];
        if (!instance || instance.terminatingPromise) {
            continue;
        }
        terminateComponentInstance(id, Boolean(opts.skipOnDestroy));
    }
    garbage.componentInstances.clear();
    garbage.connections.clear();
};

async function terminateComponentInstance(componentInstanceId: string, skipOnDestroy = false) {
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
        if (!skipOnDestroy) {
            try {
                await withTimeout(instance.worker.handleDestroyComponentInstance(), 3000);
            } catch (e) {
                console.warn(`Handle destroy component instance failed for ${componentInstanceId} (${instance.component})`, e);
            }
        }
        try {
            await withTimeout(Thread.terminate(instance.worker), 1000);
        } catch (e) {
            console.warn(`Thread.terminate failed for ${componentInstanceId} (${instance.component})`, e);
        }
        try {
            instance.eventsSub?.unsubscribe?.();
        } catch (e) {
            console.warn(`Failed to unsubscribe events for ${componentInstanceId} (${instance.component})`, e);
        }
        delete componentInstances[componentInstanceId];
        try {
            instance?.emit?.({
                type: 'componentInstanceDestroyed',
                payload: {},
                componentInstanceId,
            });
        } catch (e) {
            console.warn(`Failed to emit componentInstanceDestroyed for ${componentInstanceId} (${instance.component})`, e);
        }
    })();

    return instance.terminatingPromise;
}

setInterval(() => {
    const now = Date.now();
    for (const [id, instance] of Object.entries(componentInstances)) {
        if (!instance || instance.terminatingPromise) {
            continue;
        }
        const limit = instance.heartbeatLimitMs;
        if (now - instance.lastHeartbeat > limit) {
            console.warn(`Heartbeat limit reached (${limit} ms) — stopping ${id} (${instance.component})`);
            markComponentGarbage(id, { skipOnDestroy: true });
        }
    }
}, 1000);

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
                console.warn(`Failed to cancel component event ${eventName} (${requestId}) for ${componentInstanceId} (${instance.component})`);
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
        console.warn(`Failed to update props for component instance ${componentInstanceId} (${instance.component})`);
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
            console.warn(`Failed to handle browser callback ${callbackId} for component instance ${componentInstanceId} (${instance.component})`);
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
            console.warn(`Failed to handle event hub event ${type} for component instance ${componentInstanceId} (${instance.component})`);
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
    heapLimit = 512,
    externalLimit = 512,
    heartbeatLimitMs = 3 * 1000,
    meta = null,
}) => {
    componentOptions = safeParse(componentOptions);
    const internalWorker = new Worker(`./component-processor.js`, {
        resourceLimits: {
            maxOldGenerationSizeMb: heapLimit,
        }
    });
    internalWorker.addEventListener('error', (err) => {
        markComponentGarbage(componentInstanceId, { skipOnDestroy: true });
    });
    const worker = await spawn(internalWorker);
    componentInstances[componentInstanceId] = {
        heartbeatLimitMs,
        heapLimit,
        externalLimit,
        componentName,
        worker,
        emit,
        lastHeartbeat: Date.now(),
        heapUsed: 0,
        externalUsed: 0,
        terminatingPromise: null,
        component: `${componentNamePrefix}${componentName}`,
        startDate: new Date(),
        meta,
        /**
         * Used to store user event requests (on button click, on input, etc.).
         */
        eventRequests: {},
        connectionId,
        namespaceId,
    };
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
                        console.warn(`Failed to process response for request ${requestId} in component instance ${componentInstanceId} (${componentInstances[componentInstanceId].component})`);
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
                    console.warn(`Memory limit exceeded (heap: ${heapExceeded} ${heapUsedMB}/${instance.heapLimit}, external: ${extExceeded} ${extUsedMB}/${instance.externalLimit}) — stopping ${componentInstanceId} (${instance.component})`);
                    markComponentGarbage(componentInstanceId, { skipOnDestroy: true });
                }
            } else {
                try {
                    emit({ type, payload, componentInstanceId });
                } catch (e) {
                    console.warn(`Failed to emit event ${type} for ${componentInstanceId} (${componentInstances[componentInstanceId].component})`, e);
                }
            }
        },
        error: (err) => {
            markComponentGarbage(componentInstanceId, { skipOnDestroy: true });
        },
        complete: () => {
            markComponentGarbage(componentInstanceId, { skipOnDestroy: true });
        },
    });
    componentInstances[componentInstanceId].eventsSub = subscription;
    try {
        worker.initializeComponentInstance({
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
    } catch {
        markComponentGarbage(componentInstanceId, { skipOnDestroy: true });
    }
    clearGarbage();
}

export const onDisconnect = async ({ connectionId }) => {
    markConnectionGarbage(connectionId);
};


export const onDestroyComponentInstance = async ({ componentInstanceId }) => {
    markComponentGarbage(componentInstanceId, { skipOnDestroy: false });
};
