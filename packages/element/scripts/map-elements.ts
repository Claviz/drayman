import fs from 'fs';

import { getAngularElements } from './element-mapper';

const updateElements = async () => {
    const templatePath = './src/app/drayman-element.component.html';
    const template = await fs.promises.readFile(templatePath, 'utf8');
    const lines = template.split('\n');
    const startIndex = lines.findIndex(x => x.includes('<!--ELEMENTS-START-->')) + 1;
    const endIndex = lines.findIndex(x => x.includes('<!--ELEMENTS-END-->'));
    lines.splice(startIndex, endIndex - startIndex, getAngularElements());
    await fs.promises.writeFile(templatePath, lines.join('\n'));
}

updateElements();