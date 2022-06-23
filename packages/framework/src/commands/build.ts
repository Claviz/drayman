import * as draymanCore from '@drayman/core';
import cupr from 'cup-readdir';
import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

import { getDraymanConfig } from '../config';

process.env.NODE_ENV = 'production';

const getPostcssrc = async () => {
    try {
        return await postcssrc();
    } catch (err) { }

    return null;
}

export async function build() {
    const { outDir, srcDir, postcssSourceFile, postcssDestinationFile, componentsOutputDir } = getDraymanConfig();
    const postcssrc = await getPostcssrc();
    if (postcssrc) {
        const source = await fs.readFile(postcssSourceFile, 'utf-8');
        const processedCss = (await postcss(postcssrc.plugins).process(source, postcssrc.options));
        await fs.writeFile(postcssDestinationFile, processedCss.css);
    }

    const componentsDir = path.join(srcDir, 'components');
    await fs.ensureDir(componentsDir);
    const templateFilePath = path.join(componentsDir, `./index.d.ts`);
    await fs.ensureFile(templateFilePath);
    const files = await cupr.getAllFilePaths(srcDir);
    const template = await fs.readFile(templateFilePath, 'utf8');
    const lines = template.split('\n');
    const componentFilePaths = files.filter(x => x.startsWith(componentsDir) && x.endsWith('.tsx'));
    const componentNames = componentFilePaths.map(x => path.basename(x).replace('.tsx', ''));
    let newLines = componentNames.map(x => `'${x}': { [propName: string]: any; };`);
    const startIndex = lines.findIndex(x => x.includes('// ELEMENTS-START')) + 1;
    if (startIndex) {
        const endIndex = lines.findIndex(x => x.includes('// ELEMENTS-END'));
        lines.splice(startIndex, endIndex - startIndex, ...newLines);
    } else {
        newLines = [
            `declare namespace JSX {`,
            `interface IntrinsicElements {`,
            `// ELEMENTS-START`,
            ...newLines,
            `// ELEMENTS-END`,
            `}`,
            `}`
        ]
        lines.splice(startIndex, 0, ...newLines);
    }
    await fs.outputFile(templateFilePath, lines.join('\n'));
    for (const componentName of componentNames) {
        const script = await fs.readFile(path.join(componentsDir, `${componentName}.tsx`), 'utf-8');
        await draymanCore.saveComponent({ scriptPath: path.join(process.cwd(), componentsDir, `${componentName}.tsx`), script, outputFile: path.join(componentsOutputDir, `${componentName}.js`) });
    }
    const otherFiles = files.filter(x => x.endsWith('.ts') && !x.endsWith('.d.ts'));
    for (const otherFile of otherFiles) {
        const script = await fs.readFile(otherFile, 'utf-8');
        await draymanCore.saveComponent({ script, scriptPath: otherFile, outputFile: path.join(outDir, `${otherFile.replace(`${srcDir}/`, '').replace('.ts', '')}.js`) });
    }
}