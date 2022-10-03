import path from 'path';

export function getDraymanConfig() {
    const draymanConfig = require(path.join(process.cwd(), 'drayman.config.js'));
    const srcDir = draymanConfig.srcDir || `./src`;
    const publicDir = draymanConfig.publicDir || `./public`;
    const outDir = draymanConfig.outDir || `./dist`;
    const componentsOutputDir = `${outDir}/components`;
    const postcssSourceFile = draymanConfig.postcss?.source || `${srcDir}/styles.css`;
    const postcssDestinationFile = draymanConfig.postcss?.destination || `${publicDir}/styles.css`
    const port = draymanConfig.port || 3033;
    const sslCert = draymanConfig.sslCert;
    const sslKey = draymanConfig.sslKey;

    return {
        srcDir,
        publicDir,
        outDir,
        componentsOutputDir,
        postcssSourceFile,
        postcssDestinationFile,
        port,
        sslCert,
        sslKey,
    }
}