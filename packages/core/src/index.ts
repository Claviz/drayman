import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import ts from 'typescript';
import { spawn, Thread, Worker } from 'threads';
import { exec } from 'child_process';
import _ from 'lodash';

const getNpmPackages = (nodeModulesPath) => {
    return new Promise<string[]>((resolve) => {
        exec(`npm ls -a -p`, { cwd: nodeModulesPath, }, function (error, stdout, stderr) {
            resolve(stdout ? stdout.split(/\r\n|\n|\r/).filter(x => path.isAbsolute(x)) : [])
        });
    });
}

export const handleComponentEvent = ({ componentInstanceId, eventName, options, files, onSuccess, onError }) => {
    options = options || {};
    if (typeof options === 'string') {
        options = JSON.parse(options);
    }
    const requestId = shortid.generate();
    if (Object.keys(componentInstances).includes(componentInstanceId)) {
        componentInstances[componentInstanceId].eventRequests[requestId] = { onSuccess, onError };
        componentInstances[componentInstanceId].worker.handleComponentEvent({ eventName, requestId, options, files, });
    } else {
        onError({ err: `Component instance was not found.` });
    }

    return {
        requestId,
        cancel: () => {
            if (Object.keys(componentInstances).includes(componentInstanceId)) {
                componentInstances[componentInstanceId].worker.cancelComponentEvent({ requestId, });
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

export const onUpdateComponentInstanceProps = ({ componentInstanceId, options, }) => {
    if (typeof options === 'string') {
        options = JSON.parse(options);
    }
    componentInstances[componentInstanceId].worker.updateComponentInstanceProps({ options, });
}

export const onHandleBrowserCallback = ({ callbackId, data, }) => {
    for (const key of Object.keys(componentInstances)) {
        componentInstances[key].worker.handleBrowserCallback({ callbackId, data, });
    }
}

export const handleEventHubEvent = async ({ data, groupId = null, type, namespaceId = null }) => {
    for (const key of Object.keys(componentInstances)) {
        if (componentInstances[key].namespaceId === namespaceId) {
            componentInstances[key].worker.handleEventHubEvent({ type, data, groupId });
        }
    }
}

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
}) => {
    if (componentOptions && typeof componentOptions === 'string') {
        componentOptions = JSON.parse(componentOptions);
    }
    const worker = await spawn(new Worker(`./component-processor.js`));
    componentInstances[componentInstanceId] = {
        worker,
        terminate: async () => {
            for (const requestId of Object.keys(componentInstances[componentInstanceId].eventRequests)) {
                componentInstances[componentInstanceId].eventRequests[requestId].onError({ err: `Component instance was destroyed.` });
            }
            delete componentInstances[componentInstanceId];
            await Thread.terminate(worker);
            emit({ type: 'componentInstanceDestroyed', payload: {}, componentInstanceId });
        },
        /**
         * Used to store user event requests (on button click, on input, etc.).
         */
        eventRequests: {},
        connectionId,
        namespaceId,
    };
    worker.events().subscribe(({ type, payload }) => {
        /**
         * When there is a response to user event request.
         */
        if (type === 'response') {
            const { requestId, result, err } = payload;
            if (err) {
                componentInstances[componentInstanceId].eventRequests[requestId].onError({ err });
            } else {
                componentInstances[componentInstanceId].eventRequests[requestId].onSuccess({ result });
            }
            delete componentInstances[componentInstanceId].eventRequests[requestId];
        } else if (type === 'eventHubEvent') {
            const { eventPayload, groupId, type } = payload;
            handleEventHubEvent({ data: eventPayload, groupId, type, namespaceId });
            onEventHubEvent?.({ data: eventPayload, groupId, type, namespaceId });
        } else if (type === 'console') {
            const { text } = payload;
            onComponentInstanceConsole?.({ text });
        } else {
            emit({ type, payload, componentInstanceId });
        }
    })
    worker.initializeComponentInstance({ browserCommands, serverCommands, componentNamePrefix, componentName, componentRootDir, componentOptions, componentInstanceId, extensionsPath, extensionsOptions });
    await clearGarbage();
}

export const onDisconnect = async ({ connectionId }) => {
    garbage.connections.push(connectionId);
    await clearGarbage();
}

const garbage: { connections: string[], componentInstances: string[] } = {
    connections: [],
    componentInstances: [],
}

export const onDestroyComponentInstance = async ({ componentInstanceId }) => {
    garbage.componentInstances.push(componentInstanceId);
    await clearGarbage();
}

export const componentInstances: {
    [componentInstanceId: string]: {
        terminate: () => Promise<void>;
        worker: any;
        eventRequests: {
            [requestId: string]: {
                onSuccess: (data: { result: any }) => void,
                onError: (data: { err: any }) => void,
            };
        };
        connectionId: string;
        namespaceId: string;
    }
} = {};

const clearGarbage = _.debounce(async () => {
    const aliveComponentInstances = Object.keys(componentInstances);
    const garbageComponentInstanceIds = [
        ...aliveComponentInstances.filter(x => garbage.connections.includes(componentInstances[x].connectionId)),
        ...garbage.componentInstances,
    ];
    for (const componentInstanceId of garbageComponentInstanceIds) {
        if (componentInstances[componentInstanceId]) {
            try {
                await componentInstances[componentInstanceId].worker.handleDestroyComponentInstance();
            } catch (err) {
                console.warn(err)
            }
            componentInstances[componentInstanceId].terminate();
        }
    }
}, 250);