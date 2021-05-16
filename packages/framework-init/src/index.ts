#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import shell from 'shelljs';
import _ from 'lodash';

const name = process.argv[2];
if (!name) {
    throw new Error(`A package name is required!`);
}

const templateDir = path.resolve(__dirname, '../template');
const dest = path.resolve(process.cwd(), name);

(async () => {
    await fs.copy(templateDir, dest);
    await fs.move(path.join(dest, 'gitignore'), path.join(dest, '.gitignore'));
    const content = await fs.readFile(path.join(dest, 'package.json'), 'utf-8');
    const pkg = {
        ...JSON.parse(content),
        name: _.kebabCase(name),
        version: '0.0.0',
    };
    await fs.outputFile(path.join(dest, 'package.json'), JSON.stringify(pkg, null, 2));
    shell.exec(`cd "${name}" && npm install`);
    const cdPath = path.join(process.cwd(), name) === dest ? name : path.relative(process.cwd(), name);
    console.log(`Drayman Framework project successfully created!`);
    console.log(`Start by typing:`);
    console.log(`cd ${cdPath}`);
    console.log(`npm run start`);
})();