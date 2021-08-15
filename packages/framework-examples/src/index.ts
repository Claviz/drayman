import fs from 'fs-extra';
import shell from 'shelljs';
import _ from 'lodash';

const codeSandboxConfig = {
    template: 'node',
    infiniteLoopProtection: true,
    hardReloadOnChange: true,
    view: 'browser',
    container: {
        node: '14',
        port: 3033
    },
};

(async () => {
    await fs.rm('drayman-framework-example', { recursive: true, force: true });
    shell.exec(`npx @drayman/framework-init@latest drayman-framework-example`);
    await fs.writeFile('drayman-framework-example/sandbox.config.json', JSON.stringify(codeSandboxConfig, null, 2));
})();
