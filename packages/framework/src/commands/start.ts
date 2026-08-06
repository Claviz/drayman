import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

import { build } from './build';
import { getDraymanConfig } from '../config';
import { mountDrayman } from '../runtime';

export async function start({ projectDir = process.cwd() }: { projectDir?: string } = {}) {
    await build({ projectDir });
    const config = getDraymanConfig(projectDir);
    const app = express();
    const server = config.sslKey && config.sslCert
        ? https.createServer({
            key: fs.readFileSync(config.sslKey),
            cert: fs.readFileSync(config.sslCert),
        }, app)
        : http.createServer(app);
    const drayman = await mountDrayman({
        app,
        server,
        projectDir: config.projectDir,
    });

    server.setTimeout(0);
    await new Promise<void>((resolve, reject) => {
        server.once('error', reject);
        server.listen(config.port, () => {
            server.removeListener('error', reject);
            console.log(`Drayman started at http://localhost:${config.port}`);
            resolve();
        });
    });

    let closing = false;
    const close = async () => {
        if (closing) {
            return;
        }
        closing = true;
        try {
            await drayman.close();
        } finally {
            await new Promise<void>((resolve, reject) => {
                server.close(err => err ? reject(err) : resolve());
            });
        }
    };

    return { app, server, close };
}

if (require.main === module) {
    start().then(({ close }) => {
        const shutdown = async () => {
            try {
                await close();
                process.exit(0);
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        };
        process.once('SIGINT', shutdown);
        process.once('SIGTERM', shutdown);
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
