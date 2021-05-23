import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { find, name, path as nodeFindPath } from 'node-find';
import ts from 'typescript';
import Piscina from 'piscina';
import { MessageChannel, MessagePort } from 'worker_threads';

export const handleComponentEvent = ({ componentInstanceId, eventName, options, files, onSuccess, onError }) => {
    options = options || {};
    if (typeof options === 'string') {
        options = JSON.parse(options);
    }
    const requestId = shortid.generate();
    if (Object.keys(componentInstances).includes(componentInstanceId)) {
        componentInstances[componentInstanceId].eventRequests[requestId] = { onSuccess, onError };
        componentInstances[componentInstanceId].messagePort.postMessage({ type: 'componentEvent', payload: { eventName, requestId, options, files, } });
    } else {
        onError({ err: `Component instance was not found.` });
        // res.status(500).send(`Component instance was not found.`);
    }
}

export async function getElementsScriptPaths({ nodeModulesPath = null }) {
    nodeModulesPath = nodeModulesPath || path.join(process.cwd(), 'node_modules');
    const packages = find(nodeFindPath('*/package.json'), { start: nodeModulesPath });
    const paths = {};
    for await (const packageJsonPath of packages) {
        const packageJson = await fs.readJSON(packageJsonPath.toString('/'), { throws: false });
        const elements = packageJson?.drayman?.elements || {};
        for (const element of Object.keys(elements)) {
            paths[element] = path.join(packageJsonPath.parent.toString('/'), elements[element].script);
        }
    }
    return paths;
}

export const onLocationChange = ({ location, connectionId }) => {
    for (const key of Object.keys(componentInstances)) {
        if (componentInstances[key].connectionId === connectionId) {
            componentInstances[key].messagePort.postMessage({ type: 'handleLocationChange', payload: { location } });
        }
    }
}

export const onUpdateComponentInstanceProps = ({ componentInstanceId, options, }) => {
    if (typeof options === 'string') {
        options = JSON.parse(options);
    }
    componentInstances[componentInstanceId].messagePort.postMessage({ type: 'updateComponentInstanceProps', payload: { componentInstanceId, options, } });
}

export const onHandleBrowserCallback = ({ callbackId, data, }) => {
    for (const key of Object.keys(componentInstances)) {
        componentInstances[key].messagePort.postMessage({ type: 'handleBrowserCallback', payload: { callbackId, data, } });
    }
}

export const handleEventHubEvent = async ({ data, groupId = null, type, namespaceId = null }) => {
    for (const key of Object.keys(componentInstances)) {
        if (componentInstances[key].namespaceId === namespaceId) {
            componentInstances[key].messagePort.postMessage({ type: 'eventHubEvent', payload: { type, data, groupId } });
        }
    }
}

export const saveComponent = async ({ script, outputFile }) => {

    const tsConfig = JSON.parse(
        await fs.readFile(
            path.join(
                __dirname,
                process.env.NODE_ENV === 'test' ? `../tests/component-processor.tsconfig.test.json` : `../component-processor.tsconfig.json`,
            ),
            'utf-8'
        )
    );
    // const componentOutputDir = path.join(rootDir, `./src/components`);
    // for (const componentFile of componentFiles) {
    // const componentScript = await fs.readFile(path.join(componentInputDir, componentFile), 'utf-8');
    const transpiledComponentScript = ts.transpileModule(script, tsConfig);
    await fs.outputFile(outputFile, transpiledComponentScript.outputText);
    // }
}

const piscina = new Piscina({
    filename: path.join(__dirname, `./component-processor.js`),
    maxThreads: Infinity,
    // minThreads: 100,
});

export const onInitializeComponentInstance = ({
    namespaceId = null,
    extensionsPath = null,
    extensionsOptions = null,
    componentNamePrefix = '',
    componentName,
    componentRootDir,
    componentInstanceId,
    componentOptions,
    location,
    connectionId,
    emit,
    isModal,
    onComponentInstanceConsole,
}) => {

    // const subprocess = execa.node(
    //     path.join(__dirname, `./component-processor.js`),
    //     [
    //         componentInstanceId
    //     ],
    //     { nodeOptions: ['--unhandled-rejections=strict'], serialization: 'advanced', }
    // );
    const abortController = new AbortController();
    const { port1, port2 } = new MessageChannel();
    const { signal } = abortController;
    // port2.on('message', (message) => console.log('received', message));
    // port2.postMessage({ foo: 'bar' });
    piscina.run({ port: port1, componentInstanceId }, { transferList: [port1], signal, }).catch(e => {
        delete componentInstances[componentInstanceId];
        emit({ type: 'componentInstanceDestroyed', payload: {}, componentInstanceId });
    });

    componentInstances[componentInstanceId] = {
        abortController,
        messagePort: port2,
        // process: subprocess,
        /**
         * Used to store user event requests (on button click, on input, etc.).
         */
        eventRequests: {},
        connectionId,
        namespaceId,
    };
    // // // subprocess.stdout?.on('data', (data) => {
    // // //     onComponentInstanceConsole?.({ text: data.toString('utf8') });
    // // //     // console.log(data.toString('utf8'));
    // // //     // httpClient.debug({ data: data.toString('utf8') });
    // // // });
    // // // subprocess.stderr?.on('data', (data) => {
    // // //     onComponentInstanceConsole?.({ text: data.toString('utf8') });
    // // //     // console.log(data.toString('utf8'));
    // // //     // httpClient.debug({ data: data.toString('utf8') });
    // // // });
    /**
     * When component instance gets destroyed, we must check for existing user event requests
     * and cancel them.
     */
    // subprocess.on('exit', (x) => {
    //     // const requests = componentInstances[componentInstanceId].eventRequests;
    //     // for (const requestId of Object.keys(requests)) {
    //     //     requests[requestId].status(500).send(`Component instance was destroyed.`);
    //     // }
    //     delete componentInstances[componentInstanceId];
    //     emit({ type: 'componentInstanceDestroyed', payload: {}, componentInstanceId });
    //     // httpClient.sendView({
    //     //     view: null,
    //     // });
    // });
    /**
     * Handles messages sent by component instance process.
     */
    port2.on('message', ({ type, payload, componentInstanceId }: any) => {
        /**
         * When there is a response to user event request.
         */
        if (type === 'response') {
            const { requestId, result, err } = payload;
            if (err) {
                // emit({ type: 'componentEventError', payload: { err, requestId }, componentInstanceId });
                componentInstances[componentInstanceId].eventRequests[requestId].onError({ err });
                // componentInstances[componentInstanceId].eventRequests[requestId].status(500).send(`${err}`);
            } else {
                // emit({ type: 'componentEventSuccess', payload: { result, requestId }, componentInstanceId });
                componentInstances[componentInstanceId].eventRequests[requestId].onSuccess({ result });
                // componentInstances[componentInstanceId].eventRequests[requestId].json(result || null);
            }
            delete componentInstances[componentInstanceId].eventRequests[requestId];
        } else if (type === 'eventHubEvent') {
            const { eventPayload, groupId, type } = payload;
            handleEventHubEvent({ data: eventPayload, groupId, type, namespaceId });
        } else if (type === 'console') {
            const { text } = payload;
            onComponentInstanceConsole?.({ text });
        } else {
            emit({ type, payload, componentInstanceId });
        }
    })
    port2.postMessage({ type: 'init', payload: { componentNamePrefix, componentName, componentRootDir, componentOptions, componentInstanceId, location, extensionsPath, extensionsOptions, isModal } });
}

export const onDisconnect = ({ connectionId }) => {
    for (const componentInstanceId of Object.keys(componentInstances).filter(x => componentInstances[x].connectionId === connectionId)) {
        componentInstances[componentInstanceId].abortController.abort();
    }
}

export const onDestroyComponentInstance = ({ componentInstanceId }) => {
    componentInstances[componentInstanceId].abortController.abort();
}

export const componentInstances: {
    [componentInstanceId: string]: {
        messagePort: MessagePort;
        abortController: AbortController;
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
