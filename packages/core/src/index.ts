import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import shortid from 'shortid';

export const handleComponentEvent = ({ componentInstanceId, eventName, options, files, onSuccess, onError }) => {
    const requestId = shortid.generate();
    if (Object.keys(componentInstances).includes(componentInstanceId)) {
        componentInstances[componentInstanceId].eventRequests[requestId] = { onSuccess, onError };
        componentInstances[componentInstanceId].process.send({ type: 'componentEvent', payload: { eventName, requestId, options, files, } });
    } else {
        onError({ err: `Component instance was not found.` });
        // res.status(500).send(`Component instance was not found.`);
    }
}


// app.post('/updateComponentInstanceProps', async (req, res, next) => {
//     try {
//         const { componentInstanceId, options } = req.body;
//         componentInstances[componentInstanceId].process.send({ type: 'updateComponentInstanceProps', payload: { options } });
//         res.send();
//     } catch (err) {
//         next(err);
//     }
// });


/**
 * Returns `package.json` content for drayman packages.
 * Drayman package is a package which contains `drayman` field inside `package.json`.
 */
export async function getDraymanPackages() {
    const cfPackages: { [packagePath: string]: any; } = {};
    const packages = await fs.readdir('./node_modules');
    for (const packageName of packages) {
        const packagePath = `./node_modules/${packageName}`;
        const packageJsonPath = path.join(packagePath, `package.json`);
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = await fs.readJSON(packageJsonPath, { throws: false });
            if (packageJson?.['drayman']) {
                cfPackages[packagePath] = packageJson['drayman']
            }
        }
    }

    return cfPackages;
}

export const getElementScriptByTag = async ({ elementTag }) => {
    const packages = await getDraymanPackages();
    const packagePath = Object.keys(packages).find(x => packages[x].elements[elementTag]);
    if (packagePath) {
        const script = await fs.readFile(path.join(packagePath, packages[packagePath].elements[elementTag].script), 'utf8');
        return script;
    } else {
        throw new Error('Element script not found.');
    }
}

export const onLocationChange = ({ location, connectionId }) => {
    for (const key of Object.keys(componentInstances)) {
        if (!componentInstances[key].process.killed && componentInstances[key].connectionId === connectionId) {
            componentInstances[key].process.send({ type: 'handleLocationChange', payload: { location } });
        }
    }
}

export const onUpdateComponentInstanceProps = ({ componentInstanceId, options, }) => {
    componentInstances[componentInstanceId].process.send({ type: 'updateComponentInstanceProps', payload: { componentInstanceId, options, } });
}

export const onHandleBrowserCallback = ({ callbackId, data, }) => {
    for (const key of Object.keys(componentInstances)) {
        if (!componentInstances[key].process.killed) {
            componentInstances[key].process.send({ type: 'handleBrowserCallback', payload: { callbackId, data, } });
        }
    }
}

export const handleEventHubEvent = async ({ data, groupId = null, type, namespaceId = null }) => {
    for (const key of Object.keys(componentInstances)) {
        if (!componentInstances[key].process.killed && componentInstances[key].namespaceId === namespaceId) {
            componentInstances[key].process.send({ type: 'eventHubEvent', payload: { type, data, groupId } });
        }
    }
}

export const onInitializeComponentInstance = ({ namespaceId = null, extensionsPath = null, extensionsOptions = null, componentNamePrefix = '', componentName, componentRootDir, componentInstanceId, componentOptions, location, connectionId, emit }) => {
    const subprocess = execa.node(
        `${path.join(path.dirname(require.resolve('ts-node/package.json')), 'dist/bin-transpile')}`,
        [
            '--project',
            path.join(
                __dirname,
                process.env.NODE_ENV === 'test' ? `../tests/component-processor.tsconfig.test.json` : `../shared/component-processor.tsconfig.json`,
            ),
            // '--files',
            '--skip-ignore',
            path.join(__dirname, '../shared/component-processor.ts'),
            componentInstanceId
        ],
        { nodeOptions: ['--unhandled-rejections=strict'], serialization: 'advanced', }
    );
    componentInstances[componentInstanceId] = {
        process: subprocess,
        /**
         * Used to store user event requests (on button click, on input, etc.).
         */
        eventRequests: {},
        connectionId,
        namespaceId,
    };
    subprocess.stdout?.on('data', (data) => {
        console.log(data.toString('utf8'));
        // httpClient.debug({ data: data.toString('utf8') });
    });
    subprocess.stderr?.on('data', (data) => {
        console.log(data.toString('utf8'));
        // httpClient.debug({ data: data.toString('utf8') });
    });
    /**
     * When component instance gets destroyed, we must check for existing user event requests
     * and cancel them.
     */
    subprocess.on('exit', (x) => {
        // const requests = componentInstances[componentInstanceId].eventRequests;
        // for (const requestId of Object.keys(requests)) {
        //     requests[requestId].status(500).send(`Component instance was destroyed.`);
        // }
        delete componentInstances[componentInstanceId];
        emit({ type: 'componentInstanceDestroyed', payload: {}, componentInstanceId });
        // httpClient.sendView({
        //     view: null,
        // });
    });
    /**
     * Handles messages sent by component instance process.
     */
    subprocess.on('message', ({ type, payload, componentInstanceId }: any) => {
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
        } else {
            emit({ type, payload, componentInstanceId });
        }
    })
    subprocess.send({ type: 'init', payload: { componentNamePrefix, componentName, componentRootDir, componentOptions, componentInstanceId, location, extensionsPath, extensionsOptions } });
}

export const onDisconnect = ({ connectionId }) => {
    for (const componentInstanceId of Object.keys(componentInstances).filter(x => componentInstances[x].connectionId === connectionId)) {
        componentInstances[componentInstanceId].process.kill();
    }
}

export const onDestroyComponentInstance = ({ componentInstanceId }) => {
    componentInstances[componentInstanceId].process.kill();
}

export const componentInstances: {
    [componentInstanceId: string]: {
        process: execa.ExecaChildProcess<string>;
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
