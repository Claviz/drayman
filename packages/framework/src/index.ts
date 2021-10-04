#!/usr/bin/env node

import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import * as draymanCore from '@drayman/core';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import WebSocket from 'ws';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import cupr from 'cup-readdir';
import { createHttpTerminator } from 'http-terminator';

process.env.NODE_ENV = 'production';

const getPostcssrc = async () => {
    try {
        return await postcssrc();
    } catch (err) { }

    return null;
}

const build = async () => {
    const postcssrc = await getPostcssrc();
    if (postcssrc) {
        const sourceFile = draymanConfig.postcss?.source || `${srcDir}/styles.css`;
        const source = await fs.readFile(sourceFile, 'utf-8');
        const processedCss = (await postcss(postcssrc.plugins).process(source, postcssrc.options));
        const destination = draymanConfig.postcss?.destination || `${publicDir}/styles.css`
        await fs.writeFile(destination, processedCss.css);
    }

    const componentsDir = `${srcDir}/components`;
    await fs.ensureDir(componentsDir);
    const templateFilePath = path.join(componentsDir, `./index.d.ts`);
    await fs.ensureFile(templateFilePath);
    const files = await cupr.getAllFilePaths(srcDir);
    const template = await fs.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    const componentFilePaths = files.filter(x => x.startsWith(componentsDir) && x.endsWith('.tsx'));
    const componentNames = componentFilePaths.map(x => path.basename(x).replace('.tsx', ''));
    let newLines = componentNames.map(x => `'${x}': { [propName: string]: any; };`);
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
    for (const componentName of componentNames) {
        const script = await fs.readFile(path.join(componentsDir, `${componentName}.tsx`), 'utf-8');
        await draymanCore.saveComponent({ script, outputFile: path.join(componentsOutputDir, `${componentName}.js`) });
    }
    const otherFiles = files.filter(x => x.endsWith('.ts') && !x.endsWith('.d.ts'));
    for (const otherFile of otherFiles) {
        const script = await fs.readFile(otherFile, 'utf-8');
        await draymanCore.saveComponent({ script, outputFile: path.join(outDir, `${otherFile.replace(`${srcDir}/`, '').replace('.ts', '')}.js`) });
    }
}

const start = async () => {
    await build();
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

    const port = draymanConfig.port || 3033;
    const server = app.listen(port);
    const httpTerminator = createHttpTerminator({ server });
    console.log(`Drayman started at http://localhost:${port}`);
    server.setTimeout(0);

    const wss = new WebSocket.Server({ server });
    wss.on('connection', function connection(ws) {
        const connectionId = shortid();
        ws.on('close', () => {
            draymanCore.onDisconnect({ connectionId });
        });
        ws.on('message', function incoming(message: string) {
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

    return {
        broadcast: (data) => wss.clients.forEach((ws) => {
            ws.send(JSON.stringify(data));
        }),
        close: async () => {
            await httpTerminator.terminate();
        }
    }
}

const command = process.argv[2];
const draymanConfig = require(path.join(process.cwd(), 'drayman.config.js'));
const srcDir = draymanConfig.srcDir || `./src`;
const publicDir = draymanConfig.publicDir || `./public`;
const outDir = draymanConfig.outDir || `./dist`;
const componentsOutputDir = `${outDir}/components`;
let elementsPaths = {};

(async () => {
    elementsPaths = await draymanCore.getElementsScriptPaths({});
    if (command === 'start') {
        let server = await start();
        chokidar.watch(srcDir, {
            ignored: (path) => path.endsWith('.d.ts'),
            ignoreInitial: true,
        }).on('all', async (a, b) => {
            await server.close();
            server = await start();
        });
    } else if (command === 'build') {
        await build();
    } else {
        throw new Error(`Unknown command.`);
    }
})();