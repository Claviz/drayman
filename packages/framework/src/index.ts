#!/usr/bin/env node
import nodemon from 'nodemon';
import path from 'path';

import { getDraymanConfig } from './config';

const command = process.argv[2];

(async () => {
    const { srcDir } = getDraymanConfig();
    if (command === 'start') {
        nodemon({
            script: path.join(__dirname, 'commands/start.js'),
            watch: srcDir,
            ext: 'ts tsx json css',
            ignore: ['*/**.d.ts'],
        });
        nodemon.on('restart', function () {
            console.log('Restarting Drayman...');
        });
    } else if (command === 'build') {
        const { build } = await import('./commands/build');
        await build();
    } else {
        throw new Error(`Unknown command.`);
    }
})();