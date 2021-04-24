import draymanTags from '@drayman/tags';
import fs from 'fs';

const templateFilePath = `./src/app/drayman-element.component.html`;

const getAttributesStr = (attributes: draymanTags.IAttributes) => {
    return Array.from(
        new Set(
            Object.values(attributes || {})
                .filter(x => !!x.ng)
                .map(x => x.ng)
        )
    ).join(' ');
}

(async () => {
    const newLines = [];
    const template = await fs.promises.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    const startIndex = lines.findIndex(x => x.includes('<!--ELEMENTS-START-->')) + 1;
    const endIndex = lines.findIndex(x => x.includes('<!--ELEMENTS-END-->'));
    const commonAttributes = draymanTags.elements['*'].attributes;
    const commonAttributesStr = getAttributesStr(commonAttributes);
    for (const elementTag of Object.keys(draymanTags.elements).filter(x => x !== '*')) {
        const element = draymanTags.elements[elementTag];
        const elementAttributesStr = getAttributesStr(element.attributes);
        newLines.push(`<ng-container *ngSwitchCase="'${elementTag}'">`);
        if (element.empty) {
            newLines.push(`<${element.ng || elementTag} ${commonAttributesStr} ${elementAttributesStr} />`);
        } else {
            newLines.push(`<${element.ng || elementTag} ${commonAttributesStr} ${elementAttributesStr}>`);
            newLines.push(`<ng-container *ngTemplateOutlet="childrenTemplate; context: {children: element.children}"></ng-container>`);
            newLines.push(`</${element.ng || elementTag}>`);
        }
        newLines.push(`</ng-container>`);
    }
    lines.splice(startIndex, endIndex - startIndex, ...newLines);
    await fs.promises.writeFile(templateFilePath, lines.join('\n'));
})();