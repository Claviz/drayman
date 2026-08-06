const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const express = require('express');
const WebSocket = require('ws');

const { buildDrayman, mountDrayman, normalizeBasePath } = require('../dist');

const request = (server, requestPath) => new Promise((resolve, reject) => {
    const address = server.address();
    const req = http.get({
        host: '127.0.0.1',
        port: address.port,
        path: requestPath,
    }, res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve({
            body,
            headers: res.headers,
            status: res.statusCode,
        }));
    });
    req.on('error', reject);
});

const listen = server => new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
        server.removeListener('error', reject);
        resolve();
    });
});

const closeServer = server => new Promise((resolve, reject) => {
    server.close(err => err ? reject(err) : resolve());
});

const openWebSocket = server => new Promise((resolve, reject) => {
    const address = server.address();
    const socket = new WebSocket(`ws://127.0.0.1:${address.port}/embedded-app/ws`);
    socket.once('open', () => resolve(socket));
    socket.once('error', reject);
});

const initializeComponent = socket => new Promise((resolve, reject) => {
    const messages = [];
    const timeout = setTimeout(() => reject(new Error('Component initialization timed out')), 5000);
    socket.on('message', data => {
        const message = JSON.parse(data.toString());
        messages.push(message);
        if (message.type === 'event' && message.data?.type === 'view') {
            clearTimeout(timeout);
            resolve(messages);
        }
    });
    socket.send(JSON.stringify({
        id: 1,
        type: 'initializeComponentInstance',
        data: {
            componentId: 'home',
            componentOptions: null,
            browserCommands: [],
        },
    }));
});

test('normalizeBasePath produces a stable mount path', () => {
    assert.equal(normalizeBasePath(), '/');
    assert.equal(normalizeBasePath('/'), '/');
    assert.equal(normalizeBasePath('embedded-app/'), '/embedded-app');
    assert.equal(normalizeBasePath('//embedded-app///'), '/embedded-app');
});

test('mountDrayman scopes HTTP, assets, server routes, WebSockets, and cleanup', async t => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), 'drayman-runtime-'));
    const publicDir = path.join(projectDir, 'public');
    const outDir = path.join(projectDir, 'dist');
    const srcDir = path.join(projectDir, 'src');
    const nodeModulesDir = path.join(projectDir, 'node_modules');
    await Promise.all([
        fs.mkdir(publicDir, { recursive: true }),
        fs.mkdir(path.join(srcDir, 'components'), { recursive: true }),
        fs.mkdir(path.join(nodeModulesDir, '@drayman'), { recursive: true }),
    ]);
    const corePackageDir = path.dirname(require.resolve('@drayman/core/package.json'));
    await fs.symlink(corePackageDir, path.join(nodeModulesDir, '@drayman', 'core'), 'dir');
    await Promise.all([
        fs.writeFile(path.join(projectDir, 'package.json'), '{"private":true}'),
        fs.writeFile(path.join(projectDir, 'drayman.config.js'), 'module.exports = {}'),
        fs.writeFile(path.join(publicDir, 'index.html'), '<!doctype html><title>Embedded Drayman</title>'),
        fs.writeFile(path.join(srcDir, 'index.ts'), `
            export const Server = async ({ app, onClose }) => {
                app.get('/custom', (_req, res) => res.send('custom route'));
                onClose(() => global.__draymanRuntimeCloseCount++);
                return {};
            };
        `),
        fs.writeFile(path.join(srcDir, 'components', 'home.tsx'), `
            export const component: DraymanComponent = async () => {
                return () => <p id="embedded-component">Embedded component</p>;
            };
        `),
    ]);
    await buildDrayman({ projectDir });

    global.__draymanRuntimeCloseCount = 0;
    const app = express();
    const server = http.createServer(app);
    app.get('/health', (_req, res) => res.send('healthy'));
    const mounted = await mountDrayman({
        app,
        server,
        basePath: 'embedded-app/',
        projectDir,
    });
    await listen(server);

    t.after(async () => {
        await mounted.close();
        if (server.listening) {
            await closeServer(server);
        }
        delete global.__draymanRuntimeCloseCount;
        await fs.rm(projectDir, { recursive: true, force: true });
    });

    assert.equal(mounted.basePath, '/embedded-app');
    assert.equal(mounted.websocketPath, '/embedded-app/ws');

    const health = await request(server, '/health');
    assert.equal(health.status, 200);
    assert.equal(health.body, 'healthy');

    const redirect = await request(server, '/embedded-app?view=1');
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.location, '/embedded-app/?view=1');

    const index = await request(server, '/embedded-app/');
    assert.equal(index.status, 200);
    assert.match(index.body, /Embedded Drayman/);

    const frameworkClient = await request(server, '/embedded-app/drayman-framework-client.js');
    assert.equal(frameworkClient.status, 200);
    assert.match(frameworkClient.headers['content-type'], /javascript/);

    const unscopedFrameworkClient = await request(server, '/drayman-framework-client.js');
    assert.equal(unscopedFrameworkClient.status, 404);

    const customRoute = await request(server, '/embedded-app/custom');
    assert.equal(customRoute.status, 200);
    assert.equal(customRoute.body, 'custom route');

    const missingElement = await request(server, '/embedded-app/elements/missing');
    assert.equal(missingElement.status, 404);

    const socket = await openWebSocket(server);
    const componentMessages = await initializeComponent(socket);
    assert.equal(componentMessages[0].data.componentInstanceId.length > 0, true);
    assert.equal(componentMessages[1].data.payload.view[0].data.props.id, 'embedded-component');
    assert.equal(componentMessages[1].data.payload.view[0].children[0].text, 'Embedded component');

    const originalConsoleError = console.error;
    console.error = () => { };
    const closeCode = await new Promise(resolve => {
        socket.once('close', resolve);
        socket.send('invalid message');
    }).finally(() => {
        console.error = originalConsoleError;
    });
    assert.equal(closeCode, 1003);

    await mounted.close();
    await mounted.close();
    assert.equal(global.__draymanRuntimeCloseCount, 1);
});
