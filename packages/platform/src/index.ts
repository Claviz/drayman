#!/usr/bin/env node

import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import { Server, Socket } from 'socket.io';
import * as draymanCore from '@drayman/core';
import fs from 'fs-extra';
import ts from 'typescript';

const componentInputDir = `./src/components`;

const build = async () => {
    await fs.ensureDir(componentInputDir);
    const componentFiles = await fs.readdir(componentInputDir);
    const templateFilePath = `./out/index.d.ts`;
    await fs.ensureFile(templateFilePath);
    const template = await fs.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    let newLines = componentFiles.map(x => `'${x.replace('.tsx', '')}': { [propName: string]: any; };`);
    const startIndex = lines.findIndex(x => x.includes('// ELEMENTS-START')) + 1;
    if (startIndex) {
        const endIndex = lines.findIndex(x => x.includes('// ELEMENTS-END'));
        lines.splice(startIndex, endIndex - startIndex, ...newLines);
    } else {
        newLines = [
            `declare namespace JSX {`,
            `interface IntrinsicElements {`,
            `// ELEMENTS-START`,
            ...newLines,
            `// ELEMENTS-END`,
            `}`,
            `}`
        ]
        lines.splice(startIndex, 0, ...newLines);
    }
    await fs.outputFile(templateFilePath, lines.join('\n'));
    const tsConfig = JSON.parse(await fs.readFile(`./tsconfig.json`, 'utf-8'));
    const componentOutputDir = `./out/components`;
    for (const componentFile of componentFiles) {
        const componentScript = await fs.readFile(path.join(componentInputDir, componentFile), 'utf-8');
        const transpiledComponentScript = ts.transpileModule(componentScript, tsConfig);
        await fs.outputFile(path.join(componentOutputDir, `${componentFile.replace('.tsx', '')}.js`), transpiledComponentScript.outputText);
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

    return io;
}

const command = process.argv[2];
(async () => {
    if (command === 'start:dev') {
        await build();
        const io = start();
        fs.watch(componentInputDir, async () => {
            await build();
            io.emit('browserReload');
        });
    } else if (command === 'build') {
        await build();
    } else {
        throw new Error(`Unknown command.`);
    }
})();