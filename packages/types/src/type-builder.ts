import fs from 'fs-extra';
import { htmlElementAttributes, svgElementAttributes } from 'all-html-attributes';
import _ from 'lodash';

const generateIntrinsicElements = ({ fileLines, intrinsicElements, attributes, interfaceSuffix, defaultInterface }) => {
    for (const element of Object.keys(attributes)) {
        if (element === '*') {
            fileLines.push(`\tinterface Default${interfaceSuffix} {`);
        } else {
            const interfaceName = `${_.capitalize(_.camelCase(element))}${interfaceSuffix}`;
            if (!intrinsicElements.find(x => x.includes(`"${element}"?: `))) {
                intrinsicElements.push(`\t\t"${element}"?: ${interfaceName};`);
            }
            fileLines.push(`\tinterface ${interfaceName} extends ${defaultInterface} {`);
        }
        for (const attribute of attributes[element]) {
            fileLines.push(`\t\t"${attribute}"?: ${attribute === 'style' ? 'CSS' : 'any'};`);
        }
        fileLines.push(`\t}\n`);
    }
}

(async () => {
    const typesFileText = await fs.readFile('./src/types-template.d.ts', 'utf-8');
    const typeFileLines = typesFileText.split('\n');
    const newFileLines: string[] = [];
    const intrinsicElements: string[] = [];
    for (const line of typeFileLines) {
        newFileLines.push(line);
        if (line.includes(`/*** INTRINSIC_ELEMENT_INTERFACES */`)) {
            generateIntrinsicElements({
                attributes: htmlElementAttributes,
                defaultInterface: 'DefaultElementEventProps',
                interfaceSuffix: 'ElementProps',
                fileLines: newFileLines,
                intrinsicElements,
            });
            generateIntrinsicElements({
                attributes: svgElementAttributes,
                defaultInterface: 'DefaultSvgElementEventProps',
                interfaceSuffix: 'SvgElementProps',
                fileLines: newFileLines,
                intrinsicElements,
            });
            // for (const element of Object.keys(htmlElementAttributes)) {
            //     if (element === '*') {
            //         newFileLines.push(`\tinterface DefaultElementProps {`);
            //     } else {
            //         const interfaceName = `${_.capitalize(_.camelCase(element))}ElementProps`;
            //         if (!intrinsicElements.find(x => x.includes(`"${element}"?: `))) {
            //             intrinsicElements.push(`\t\t"${element}"?: ${interfaceName};`);
            //         }
            //         newFileLines.push(`\tinterface ${interfaceName} extends DefaultElementEventProps {`);
            //     }
            //     for (const attribute of htmlElementAttributes[element]) {
            //         newFileLines.push(`\t\t"${attribute}"?: ${attribute === 'style' ? 'CSS' : 'string'};`);
            //     }
            //     newFileLines.push(`\t}\n`);
            // }
            // for (const element of Object.keys(svgElementAttributes)) {
            //     if (element === '*') {
            //         newFileLines.push(`\tinterface DefaultSvgElementProps {`);
            //     } else {
            //         const interfaceName = `${_.capitalize(_.camelCase(element))}SvgElementProps`;
            //         if (!intrinsicElements.find(x => x.includes(`"${element}"?: `))) {
            //             intrinsicElements.push(`\t\t"${element}"?: ${interfaceName};`);
            //         }
            //         newFileLines.push(`\tinterface ${interfaceName} extends DefaultSvgElementEventProps {`);
            //     }
            //     for (const attribute of svgElementAttributes[element]) {
            //         newFileLines.push(`\t\t"${attribute}"?: ${attribute === 'style' ? 'CSS' : 'string'};`);
            //     }
            //     newFileLines.push(`\t}\n`);
            // }
        } else if (line.includes(`/*** INTRINSIC_ELEMENTS */`)) {
            newFileLines.push(...intrinsicElements);
        }
    }
    await fs.outputFile('./types/index.d.ts', newFileLines.join('\n'));
})();