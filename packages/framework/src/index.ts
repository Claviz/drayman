#!/usr/bin/env node

import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import * as draymanCore from '@drayman/core';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import WebSocket from 'ws';

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
    app.get('/drayman-framework-client.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/dist/index.js'));
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

    app.get('/elements/:elementTag', async (req, res, next) => {
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

    const wss = new WebSocket.Server({ server });
    wss.on('connection', function connection(ws) {
        const connectionId = shortid();
        console.log('connect', connectionId);
        ws.on('close', () => {
            console.log('close', connectionId);
            draymanCore.onDisconnect({ connectionId });
        });
        ws.on('message', function incoming(message: string) {
            console.log(message);
            const { id, data, type } = JSON.parse(message);
            if (type === 'initializeComponentInstance') {
                const { componentId, componentOptions, browserCommands } = data;
                const componentInstanceId = shortid();
                ws.send(JSON.stringify({ id, data: { componentInstanceId } }));
                draymanCore.onInitializeComponentInstance({
                    componentName: componentId,
                    componentRootDir: componentsOutputDir,
                    componentInstanceId,
                    componentOptions,
                    connectionId,
                    emit: (message) => ws.send(JSON.stringify({ data: message, type: 'event' })),
                    onComponentInstanceConsole: ({ text }) => { console.log(text) },
                    browserCommands,
                });
            } else if (type === 'eventHubEvent') {
                const { type, groupId } = data;
                draymanCore.handleEventHubEvent({ type, data: data.data, groupId });
            } else if (type === 'updateComponentInstanceProps') {
                const { componentInstanceId, options } = data;
                draymanCore.onUpdateComponentInstanceProps({ componentInstanceId, options });
            } else if (type === 'handleBrowserCallback') {
                const { callbackId } = data;
                draymanCore.onHandleBrowserCallback({ callbackId, data: data.data });
            } else if (type === 'destroyComponentInstance') {
                const { componentInstanceId } = data;
                draymanCore.onDestroyComponentInstance({ componentInstanceId });
            }
        });
    });

    return (data) => wss.clients.forEach((ws) => {
        ws.send(JSON.stringify(data));
    })
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
        const broadcast = start();
        chokidar.watch(componentsDir, {
            ignored: (path) => path.endsWith('.d.ts'),
            ignoreInitial: true,
        }).on('all', async (a, b) => {
            await build();
            broadcast({ type: 'browserReload' })
        });
    } else if (command === 'build') {
        await build();
    } else {
        throw new Error(`Unknown command.`);
    }
})();