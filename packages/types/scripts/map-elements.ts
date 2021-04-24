import { elements } from '@drayman/tags';
import fs from 'fs';

const templateFilePath = `./scripts/typings.d.ts`;
const outputFilePath = `./dist/index.d.ts`;

(async () => {
    const newLines = [];
    const template = await fs.promises.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    const startIndex = lines.findIndex(x => x.includes('// ELEMENTS-START')) + 1;
    const endIndex = lines.findIndex(x => x.includes('// ELEMENTS-END'));
    const commonAttributesStr = Object.keys(elements['*'].attributes || {}).map(x => `${x}?: any;`).join(' ');
    for (const elementTag of Object.keys(elements).filter(x => x !== '*')) {
        const element = elements[elementTag];
        const elementAttributesStr = Object.keys(element.attributes || {}).map(x => `${x}?: any;`).join(' ');
        if (element.empty) {
            newLines.push(`'${elementTag}': { ${commonAttributesStr} ${elementAttributesStr} };`);
        } else {
            newLines.push(`'${elementTag}': { ${commonAttributesStr} ${elementAttributesStr}children?: any; };`);
        }
    }
    lines.splice(startIndex, endIndex - startIndex, ...newLines);
    await fs.promises.writeFile(outputFilePath, lines.join('\n'));
    console.log(`Successfully updated "${outputFilePath}" file!`)
})();