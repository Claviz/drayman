#!/usr/bin/env node

import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import { Server, Socket } from 'socket.io';
import * as draymanCore from '@drayman/core';
import fs from 'fs';
import ts from 'typescript';

const componentRootDir = `./src/components`;

const build = async () => {
    const componentFiles = await fs.promises.readdir(componentRootDir);
    const templateFilePath = `./node_modules/@drayman/types/dist/index.d.ts`;
    const template = await fs.promises.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    let newLines = componentFiles.map(x => `'${x.replace('.tsx', '')}': { [propName:string]: any; };`);
    const startIndex = lines.findIndex(x => x.includes('// USER-ELEMENTS-START')) + 1;
    if (startIndex) {
        const endIndex = lines.findIndex(x => x.includes('// USER-ELEMENTS-END'));
        lines.splice(startIndex, endIndex - startIndex, ...newLines);
    } else {
        newLines = [
            `declare namespace JSX {`,
            `interface IntrinsicElements {`,
            `// USER-ELEMENTS-START`,
            ...newLines,
            `// USER-ELEMENTS-END`,
            `}`,
            `}`
        ]
        lines.splice(startIndex, 0, ...newLines);
    }
    await fs.promises.writeFile(templateFilePath, lines.join('\n'));
    const tsConfig = JSON.parse(await fs.promises.readFile(`./tsconfig.json`, 'utf-8'));
    for (const componentFile of componentFiles) {
        const componentScript = await fs.promises.readFile(path.join(componentRootDir, componentFile), 'utf-8');
        const transpiledComponentScript = ts.transpileModule(componentScript, tsConfig);
        await fs.promises.writeFile(path.join(`./out/components`, `${componentFile.replace('.tsx', '')}.js`), transpiledComponentScript.outputText);
    }
    console.log(`Rebuilt!`);
}

const start = () => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    // const componentInstances = {};
    const app = express();
    // let ws;
    app.use(express.json());
    app.use(express.static('./public'));
    // app.use(express.static('./app/dist/app'));
    app.get('/drayman-element.js', function (req, res) {
        console.log(path.join(__dirname, '../element/dist/main-es2015.js'));
        res.sendFile(path.join(__dirname, '../element/dist/main-es2015.js'));
    });
    // app.get('/drayman.js', async (req, res) => {
    //     const script = await fs.readFile(path.join(__dirname, './app/main-es2015.js'), 'utf8');
    //     res.send(script);
    // });
    /**
     * If user emits some event (on button click, on value change, etc.), we store
     * this event inside component instance object and send this request to the process.
     * Then it is a processor responsibility to do something with request.
     */
    app.post('/api/componentEvent', upload.any(), async (req, res, next) => {
        try {
            const { componentInstanceId, eventName } = req.body;
            draymanCore.handleComponentEvent({ componentInstanceId, eventName, options: req.body.options, files: req.files, res })
        } catch (err) {
            console.log(err);
            next(err);
        }
    });

    app.post('/event', async (req, res, next) => {
        try {
            const { type, data, groupId } = req.body;
            draymanCore.handleEventHubEvent({ type, data, groupId })
            res.send();
        } catch (err) {
            next(err);
        }
    });

    // app.post('/updateComponentInstanceProps', async (req, res, next) => {
    //     try {
    //         const { componentInstanceId, options } = req.body;
    //         componentInstances[componentInstanceId].process.send({ type: 'updateComponentInstanceProps', payload: { options } });
    //         res.send();
    //     } catch (err) {
    //         next(err);
    //     }
    // });

    app.get('/api/elementScript/:elementTag', async (req, res, next) => {
        try {
            const { elementTag } = req.params;
            const script = await draymanCore.getElementScriptByTag({ elementTag });
            res.send(script);
        } catch (err) {
            next(err);
        }
    });

    app.use((err: any, req: any, res: express.Response, next: any) => {
        res.status(500).send(err);
    });

    app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

    process.on('uncaughtException', function (err) {
        console.log(err);
    });

    // import { BrowserEventMessage, CloseModalMessage, ComponentInstanceMessage, CustomDraymanEvent, DraymanEvents, HandleBrowserCallback, InitializeComponentInstance, LocationChange, OpenModalMessage, UpdateComponentInstanceProps, ViewComponentInstanceMessage } from '../shared/types';

    const server = app.listen(3033);
    console.log(`Drayman started`);
    server.setTimeout(0);
    const io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log(`CONNECTED`);
        socket.on('locationChange', ({ location }) => {
            draymanCore.onLocationChange({ location, connectionId: socket.id });
        });
        socket.on('updateComponentInstanceProps', ({ componentInstanceId, options }) => {
            draymanCore.onUpdateComponentInstanceProps({ componentInstanceId, options });
        });
        socket.on('handleBrowserCallback', ({ callbackId, data }) => {
            draymanCore.onHandleBrowserCallback({ callbackId, data });
        });
        socket.on('initializeComponentInstance', ({ componentId, componentOptions, location }, callback) => {
            console.log(`initializeComponentInstance`);
            const componentInstanceId = shortid();
            callback({ componentInstanceId });
            draymanCore.onInitializeComponentInstance({
                componentName: componentId,
                componentRootDir: `out/components`,
                // componentPath: `./out/components/${componentId}`,
                componentInstanceId,
                componentOptions,
                location,
                connectionId: socket.id,
                emit: (message) => socket.emit('event', message),
            });
        });
        socket.on('disconnect', () => {
            draymanCore.onDisconnect({ connectionId: socket.id });
        });
        socket.on('destroyComponentInstance', ({ componentInstanceId }) => {
            draymanCore.onDestroyComponentInstance({ componentInstanceId });
        });
    });
}

const command = process.argv[2];
(async () => {
    if (command === 'start') {
        start();
    } else if (command === 'build') {
        await build();
    } else if (command === 'build:watch') {
        await build();
        fs.watch(componentRootDir, build);
    } else {
        throw new Error(`Unknown command.`);
    }
})();