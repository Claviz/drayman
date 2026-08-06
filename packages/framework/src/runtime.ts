import * as draymanCore from '@drayman/core';
import express from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import path from 'path';
import shortid from 'shortid';
import WebSocket from 'ws';
import type { Server as HttpServer } from 'http';

import { getDraymanConfig } from './config';

type CloseHandler = () => Promise<void> | void;

export interface MountDraymanOptions {
    app: express.Application;
    server: HttpServer;
    basePath?: string;
    projectDir?: string;
}

export interface MountedDrayman {
    basePath: string;
    websocketPath: string;
    close: () => Promise<void>;
}

class EventHubClass {
    #handlers: {
        [eventName: string]: {
            func: any;
            groupId: any;
        }[];
    } = {};

    constructor(private namespaceId: string) { }

    emit = async (type, eventPayload, groupId = null) => {
        await draymanCore.handleEventHubEvent({
            type,
            data: eventPayload,
            groupId,
            namespaceId: this.namespaceId,
        });
    }

    on = (eventName, func, groupId = null) => {
        if (this.#handlers[eventName]) {
            this.#handlers[eventName].push({ func, groupId });
        } else {
            this.#handlers[eventName] = [{ func, groupId }];
        }
    }

    execute = async (eventName, options, groupId = null) => {
        if (this.#handlers[eventName]) {
            for (const handler of this.#handlers[eventName].filter(x => x.groupId === groupId)) {
                await handler.func(options);
            }
        }
    }

    clear = () => {
        this.#handlers = {};
    }
}

export const normalizeBasePath = (basePath = '/') => {
    const normalized = `/${basePath}`.replace(/\/+/g, '/').replace(/\/$/, '');
    return normalized === '' ? '/' : normalized;
};

const joinBasePath = (basePath: string, route: string) =>
    basePath === '/' ? route : `${basePath}${route}`;

const getRequestPath = (url = '/') => {
    try {
        return new URL(url, 'http://drayman.local').pathname;
    } catch {
        return url;
    }
};

export async function mountDrayman({
    app,
    server,
    basePath = '/',
    projectDir = process.cwd(),
}: MountDraymanOptions): Promise<MountedDrayman> {
    const normalizedBasePath = normalizeBasePath(basePath);
    const websocketPath = joinBasePath(normalizedBasePath, '/ws');
    const config = getDraymanConfig(projectDir);
    const {
        publicDir,
        componentsOutputDir,
        outDir,
        nodeModulesDir,
        heapLimit,
        externalLimit,
        heartbeatLimitMs,
        logging,
    } = config;
    const namespaceId = shortid();
    const EventHub = new EventHubClass(namespaceId);
    const closeHandlers: CloseHandler[] = [];
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const router = express.Router();
    const elementsPaths = await draymanCore.getElementsScriptPaths({ nodeModulesPath: nodeModulesDir });

    router.use(express.json());
    router.use(express.static(publicDir));
    router.get('/drayman-framework-client.js', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.js'));
    });

    let Server: any = {};
    const serverModulePath = path.join(outDir, 'index.js');
    if (await fs.pathExists(serverModulePath)) {
        const serverModule = await import(serverModulePath);
        if (serverModule.Server) {
            Server = await serverModule.Server({
                app: router,
                basePath: normalizedBasePath,
                projectDir: config.projectDir,
                emit: (callbackId, data) => draymanCore.onHandleBrowserCallback({ callbackId, data }),
                EventHub,
                onClose: (handler: CloseHandler) => closeHandlers.push(handler),
            }) || {};
        }
    }

    router.post('/api/componentEvent', upload.any(), async (req, res, next) => {
        try {
            const { componentInstanceId, eventName } = req.body;
            const { cancel } = draymanCore.handleComponentEvent({
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
            next(err);
        }
    });

    router.post('/event', async (req, res, next) => {
        try {
            const { type, data, groupId } = req.body;
            await draymanCore.handleEventHubEvent({ type, data, groupId, namespaceId });
            await EventHub.execute(type, data, groupId);
            res.send();
        } catch (err) {
            next(err);
        }
    });

    router.get('/elements/:elementTag', async (req, res, next) => {
        try {
            const { elementTag } = req.params;
            const elementPath = elementsPaths[elementTag];
            if (!elementPath) {
                res.sendStatus(404);
                return;
            }
            res.sendFile(elementPath);
        } catch (err) {
            next(err);
        }
    });

    router.get('*', (_req, res) => res.sendFile(path.resolve(publicDir, 'index.html')));
    router.use((err: any, _req: any, res: express.Response, _next: any) => {
        res.status(500).send(err);
    });
    if (normalizedBasePath !== '/') {
        app.get(normalizedBasePath, (req, res, next) => {
            if (getRequestPath(req.originalUrl) !== normalizedBasePath) {
                next();
                return;
            }
            const queryIndex = req.originalUrl.indexOf('?');
            const query = queryIndex === -1 ? '' : req.originalUrl.slice(queryIndex);
            res.redirect(308, `${normalizedBasePath}/${query}`);
        });
    }
    app.use(normalizedBasePath, router);

    const wss = new WebSocket.Server({ noServer: true });
    wss.on('connection', function connection(ws) {
        const connectionId = shortid();
        ws.on('close', () => {
            draymanCore.onDisconnect({ connectionId });
        });
        ws.on('message', async function incoming(message) {
            try {
                const { id, data, type } = JSON.parse(message.toString());
                if (type === 'initializeComponentInstance') {
                    const { componentId, componentOptions, browserCommands } = data;
                    const componentInstanceId = shortid();
                    ws.send(JSON.stringify({ id, data: { componentInstanceId } }));
                    await draymanCore.onInitializeComponentInstance({
                        namespaceId,
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
                        heapLimit,
                        externalLimit,
                        heartbeatLimitMs,
                        logging,
                    });
                } else if (type === 'eventHubEvent') {
                    const { type, groupId } = data;
                    await draymanCore.handleEventHubEvent({ type, data: data.data, groupId, namespaceId });
                    await EventHub.execute(type, data.data, groupId);
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
            } catch (err) {
                console.error(err);
                ws.close(1003, 'Invalid Drayman message');
            }
        });
    });

    const upgradeHandler = (request, socket, head) => {
        if (getRequestPath(request.url) !== websocketPath) {
            return;
        }
        wss.handleUpgrade(request, socket, head, ws => {
            wss.emit('connection', ws, request);
        });
    };
    server.on('upgrade', upgradeHandler);

    let closed = false;
    const close = async () => {
        if (closed) {
            return;
        }
        closed = true;
        server.removeListener('upgrade', upgradeHandler);
        try {
            for (const handler of closeHandlers.reverse()) {
                await handler();
            }
        } finally {
            for (const client of wss.clients) {
                client.terminate();
            }
            await draymanCore.onDestroyNamespace({ namespaceId });
            await new Promise<void>((resolve, reject) => {
                wss.close(err => err ? reject(err) : resolve());
            });
            EventHub.clear();
        }
    };

    return {
        basePath: normalizedBasePath,
        websocketPath,
        close,
    };
}
