import * as draymanCore from '@drayman/core';
import express from 'express';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import WebSocket from 'ws';
import https from 'https';
import fs from 'fs';

import { build } from './build';
import { getDraymanConfig } from '../config';

class EventHubClass {
    #handlers: {
        [eventName: string]: {
            func: any;
            groupId: any;
        }[];
    } = {};
    emit = async (type, eventPayload, groupId = null) => {
        draymanCore.handleEventHubEvent({ type, data: eventPayload, groupId });
    }
    on = (eventName, func, groupId = null) => {
        if (this.#handlers[eventName]) {
            this.#handlers[eventName].push({ func, groupId });
        } else {
            this.#handlers[eventName] = [{ func, groupId }];
        }
    }
    _execute = async (eventName, options, groupId = null) => {
        if (this.#handlers[eventName]) {
            for (const handler of this.#handlers[eventName].filter(x => x.groupId === groupId)) {
                await handler.func(options);
            }
        }
    }
}
const EventHub = new EventHubClass();

(async () => {
    const { publicDir, port, componentsOutputDir, outDir, sslKey, sslCert } = getDraymanConfig();
    const elementsPaths = await draymanCore.getElementsScriptPaths({});
    await build();
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    const app = express();
    app.use(express.json());
    app.use(express.static(publicDir));
    app.get('/drayman-framework-client.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/dist/index.js'));
    });
    let Server;
    try {
        Server = await (await import(path.join(process.cwd(), outDir, 'index.js'))).Server({
            app,
            emit: (callbackId, data) => draymanCore.onHandleBrowserCallback({ callbackId, data }),
            EventHub
        });
    } catch (err) { }

    app.post('/api/componentEvent', upload.any(), async (req, res, next) => {
        try {
            const { componentInstanceId, eventName } = req.body;
            const { requestId, cancel } = draymanCore.handleComponentEvent({
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
            });
            res.on('close', () => cancel());
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

    const server = (sslKey && sslCert) ? https.createServer({
        key: fs.readFileSync(sslKey),
        cert: fs.readFileSync(sslCert),
    }, app).listen(port) : app.listen(port);
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
                    emit: async (message) => {
                        if (message.type === 'serverCommand') {
                            const { data, callbackId, command } = message.payload;
                            const result = await Server[command](data);
                            draymanCore.onHandleBrowserCallback({ callbackId, data: result });
                        } else {
                            ws.send(JSON.stringify({ data: message, type: 'event' }));
                        }
                    },
                    onComponentInstanceConsole: ({ text }) => { console.log(text) },
                    browserCommands,
                    serverCommands: Object.keys(Server || {}),
                });
            } else if (type === 'eventHubEvent') {
                const { type, groupId } = data;
                draymanCore.handleEventHubEvent({ type, data: data.data, groupId });
                EventHub._execute(type, data.data, groupId);
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
})();