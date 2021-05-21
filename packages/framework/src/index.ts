#!/usr/bin/env node

import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import { Server, Socket } from 'socket.io';
import * as draymanCore from '@drayman/core';
import fs from 'fs-extra';
import ts from 'typescript';
import chokidar from 'chokidar';

const build = async () => {
    await fs.ensureDir(componentsDir);
    const componentFiles = (await fs.readdir(componentsDir)).filter(x => x.endsWith('.tsx'));
    const templateFilePath = path.join(componentsDir, `./index.d.ts`);
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
    // const tsConfig = JSON.parse(await fs.readFile(path.join(rootDir, `./tsconfig.json`), 'utf-8'));
    // const componentOutputDir = path.join(rootDir, `./src/components`);
    for (const componentFile of componentFiles) {
        const script = await fs.readFile(path.join(componentsDir, componentFile), 'utf-8');
        await draymanCore.saveComponent({ script, outputFile: path.join(componentsOutputDir, `${componentFile.replace('.tsx', '')}.js`) });
        // const transpiledComponentScript = ts.transpileModule(componentScript, tsConfig);
        // await fs.outputFile(path.join(componentOutputDir, `${componentFile.replace('.tsx', '')}.js`), transpiledComponentScript.outputText);
    }
    console.log(`Rebuilt!`);
}

const start = () => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    const app = express();
    app.use(express.json());
    app.use(express.static(publicDir));
    app.get('/drayman-element.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../element/dist/main-es2015.js'));
    });

    app.post('/api/componentEvent', upload.any(), async (req, res, next) => {
        try {
            const { componentInstanceId, eventName } = req.body;
            draymanCore.handleComponentEvent({
                componentInstanceId,
                eventName,
                options: req.body.options,
                files: req.files,
                onError: ({ err }) => {
                    res.status(500).send(`${err}`);
                },
                onSuccess: ({ result }) => {
                    res.json(result || null);
                },
                // res
            })
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

    app.get('/api/elementScript/:elementTag', async (req, res, next) => {
        try {
            const { elementTag } = req.params;
            res.sendFile(elementsPaths[elementTag]);
        } catch (err) {
            next(err);
        }
    });

    app.use((err: any, req: any, res: express.Response, next: any) => {
        res.status(500).send(err);
    });

    app.get('*', (req, res) => res.sendFile(path.resolve(publicDir, 'index.html')));

    process.on('uncaughtException', function (err) {
        console.log(err);
    });

    const server = app.listen(3033);
    console.log(`Drayman started at http://localhost:3033`);
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
        socket.on('initializeComponentInstance', ({ componentId, componentOptions, location, isModal }, callback) => {
            console.log(`initializeComponentInstance`);
            const componentInstanceId = shortid();
            callback({ componentInstanceId });
            draymanCore.onInitializeComponentInstance({
                componentName: componentId,
                componentRootDir: componentsOutputDir,
                componentInstanceId,
                componentOptions,
                location,
                connectionId: socket.id,
                emit: (message) => socket.emit('event', message),
                isModal,
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
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
const draymanConfig = require(path.join(process.cwd(), 'drayman.config.js'));
const componentsDir = draymanConfig.componentsDir || `./src/components`;
const publicDir = draymanConfig.publicDir || `./public`;
const componentsOutputDir = draymanConfig.componentsOutputDir || `./dist/components`;
let elementsPaths = {};

(async () => {
    elementsPaths = await draymanCore.getElementsScriptPaths({});
    if (command === 'start') {
        await build();
        const io = start();
        chokidar.watch(componentsDir, {
            ignored: (path) => path.endsWith('.d.ts'),
            ignoreInitial: true,
        }).on('all', async (a, b) => {
            console.log(a, b);
            await build();
            io.emit('browserReload');
        });
    } else if (command === 'build') {
        await build();
    } else {
        throw new Error(`Unknown command.`);
    }
})();