import path from 'path';

export interface DraymanConfig {
    srcDir?: string;
    outDir?: string;
    publicDir?: string;
    nodeModulesDir?: string;
    postcss?: {
        source?: string;
        destination?: string;
    };
    port?: number;
    sslCert?: string;
    sslKey?: string;
    heapLimit?: number;
    externalLimit?: number;
    heartbeatLimitMs?: number;
    logging?: any;
}

export interface ResolvedDraymanConfig {
    projectDir: string;
    srcDir: string;
    publicDir: string;
    outDir: string;
    nodeModulesDir: string;
    componentsOutputDir: string;
    postcssSourceFile: string;
    postcssDestinationFile: string;
    port: number;
    sslCert?: string;
    sslKey?: string;
    heapLimit: number;
    externalLimit: number;
    heartbeatLimitMs: number;
    logging: any;
}

const resolveFromProject = (projectDir: string, value: string) =>
    path.resolve(projectDir, value);

export function getDraymanConfig(projectDir = process.cwd()): ResolvedDraymanConfig {
    const resolvedProjectDir = path.resolve(projectDir);
    const configPath = path.join(resolvedProjectDir, 'drayman.config.js');
    const draymanConfig: DraymanConfig = require(configPath);
    const srcDir = resolveFromProject(resolvedProjectDir, draymanConfig.srcDir || 'src');
    const publicDir = resolveFromProject(resolvedProjectDir, draymanConfig.publicDir || 'public');
    const outDir = resolveFromProject(resolvedProjectDir, draymanConfig.outDir || 'dist');
    const nodeModulesDir = resolveFromProject(resolvedProjectDir, draymanConfig.nodeModulesDir || 'node_modules');
    const componentsOutputDir = path.join(outDir, 'components');
    const postcssSourceFile = resolveFromProject(
        resolvedProjectDir,
        draymanConfig.postcss?.source || path.join(draymanConfig.srcDir || 'src', 'styles.css'),
    );
    const postcssDestinationFile = resolveFromProject(
        resolvedProjectDir,
        draymanConfig.postcss?.destination || path.join(draymanConfig.publicDir || 'public', 'styles.css'),
    );
    const port = draymanConfig.port || 3033;
    const sslCert = draymanConfig.sslCert
        ? resolveFromProject(resolvedProjectDir, draymanConfig.sslCert)
        : undefined;
    const sslKey = draymanConfig.sslKey
        ? resolveFromProject(resolvedProjectDir, draymanConfig.sslKey)
        : undefined;
    const heapLimit = draymanConfig.heapLimit || 512;
    const externalLimit = draymanConfig.externalLimit || 512;
    const heartbeatLimitMs = draymanConfig.heartbeatLimitMs || 3 * 1000;
    const logging = draymanConfig.logging || null;

    return {
        projectDir: resolvedProjectDir,
        srcDir,
        publicDir,
        outDir,
        nodeModulesDir,
        componentsOutputDir,
        postcssSourceFile,
        postcssDestinationFile,
        port,
        sslCert,
        sslKey,
        heapLimit,
        externalLimit,
        heartbeatLimitMs,
        logging,
    };
}
