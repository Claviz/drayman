import {
    onDestroyComponentInstance,
    onHandleBrowserCallback,
    onInitializeComponentInstance,
    onUpdateComponentInstanceProps,
    saveComponent,
} from '../dist';
import { applyPatch } from 'fast-json-patch';
import fs from 'fs-extra';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function waitFor(predicate: () => boolean) {
    const deadline = Date.now() + 3000;
    while (!predicate()) {
        if (Date.now() >= deadline) throw new Error('Timed out waiting for worker messages');
        await sleep(10);
    }
}

describe('worker view protocol', () => {
    beforeAll(async () => {
        for (const name of ['view-overlapping-renders', 'view-container-types']) {
            const scriptPath = `./tests/components/${name}.tsx`;
            const script = await fs.readFile(scriptPath, 'utf8');
            await saveComponent({ script, scriptPath, outputFile: `./tests/dist/components/${name}.js` });
        }
    });

    test.each(['start order', 'reverse order'])('overlapping renders have increasing emission IDs in %s', async order => {
        const componentInstanceId = `view-overlap-${order}`;
        const views: any[] = [];
        const gates: any[] = [];
        try {
            await onInitializeComponentInstance({
                componentInstanceId,
                connectionId: componentInstanceId,
                componentName: 'view-overlapping-renders',
                componentRootDir: 'tests/dist/components',
                componentOptions: {},
                browserCommands: ['renderGate'],
                serverCommands: [],
                onComponentInstanceConsole: () => { },
                emit: message => {
                    if (message.type === 'view') views.push(message.payload);
                    if (message.type === 'browserCommand') gates.push(message.payload);
                },
            });
            await waitFor(() => views.length === 1);

            const update = (request: number) => onUpdateComponentInstanceProps({
                componentInstanceId, options: { request },
            });
            const release = (gate: any, a: number, b: number) => onHandleBrowserCallback({
                callbackId: gate.callbackId, data: { a, b },
            });

            update(1);
            await waitFor(() => gates.length === 1);
            // Both timers must enter runSerializedRender while render 1 is still gated.
            update(2);
            await sleep(100);
            update(3);
            await sleep(100);
            release(gates[0], 1, 0);
            await waitFor(() => gates.length === 3 && views.length === 2);
            expect(gates.map(gate => gate.data.renderNumber)).toEqual([1, 2, 3]);

            const queuedGates = order === 'start order' ? [gates[1], gates[2]] : [gates[2], gates[1]];
            release(queuedGates[0], 1, 1);
            await waitFor(() => views.length === 3);
            release(queuedGates[1], 2, 1);
            await waitFor(() => views.length === 4);

            update(4);
            await waitFor(() => gates.length === 4);
            release(gates[3], 2, 2);
            await waitFor(() => views.length === 5);

            let browserView = JSON.parse(JSON.stringify(views[0].view));
            let browserUpdateId = views[0].updateId;
            expect(browserView).toBeDefined();
            for (let i = 1; i < views.length; i++) {
                const payload = views[i];
                expect(payload.view).toBeUndefined();
                expect(payload.patch.length).toBeGreaterThan(0);
                // The browser ignores IDs that are not newer, which used to lose an update.
                expect(payload.updateId).toBeGreaterThan(browserUpdateId);
                expect(payload.baseUpdateId).toBe(browserUpdateId);
                browserView = applyPatch(browserView, payload.patch, true).newDocument;
                browserUpdateId = payload.updateId;
            }
            expect(browserView).toEqual([{
                ...views[0].view[0],
                data: {
                    ...views[0].view[0].data,
                    props: { ...views[0].view[0].data.props, a: 2, b: 2 },
                },
            }]);
        } finally {
            await onDestroyComponentInstance({ componentInstanceId });
        }
    });

    test.each([
        ['own __proto__', '{"__proto__":{"value":1}}', true, undefined],
        ['constructor prototype', '{"constructor":{"prototype":{"value":1}}}', true, undefined],
        ['escaped parent key', '{"a/b~c":{"__proto__":{"value":1}}}', true, undefined],
        ['similar key', '{"__proto__suffix":{"value":1}}', false, undefined],
        ['slash in key', '{"constructor/prototype":{"value":1}}', true, undefined],
        ['tilde in key', '{"a~b":{"value":1}}', true, undefined],
        // Patch application must not mutate nextView through operation value references.
        ['nonempty object to array', '{"x":1,"z":0}', true, '[{"y":2}]'],
    ])('handles %s changes without rejecting browser patches', async (name, json, snapshotExpected, replacement) => {
        const componentInstanceId = `view-protected-${name}`;
        const nextJson = replacement || (json as string).replace(':1', ':2');
        const states = [
            { value: JSON.parse(json as string), label: 'before' },
            { value: JSON.parse(nextJson as string), label: 'before' },
            { value: JSON.parse(nextJson as string), label: 'after' },
        ];
        const payloads: any[] = [];
        try {
            await onInitializeComponentInstance({
                componentInstanceId,
                connectionId: componentInstanceId,
                componentName: 'view-container-types',
                componentRootDir: 'tests/dist/components',
                componentOptions: states[0],
                browserCommands: [],
                serverCommands: [],
                onComponentInstanceConsole: () => { },
                emit: message => { if (message.type === 'view') payloads.push(message.payload); },
            });

            let browserView;
            for (let i = 0; i < states.length; i++) {
                if (i > 0) onUpdateComponentInstanceProps({ componentInstanceId, options: states[i] });
                await waitFor(() => payloads.length === i + 1);
                const payload = payloads[i];
                const expectsSnapshot = i === 0 || (i === 1 && snapshotExpected);
                if (expectsSnapshot) {
                    expect(payload.view).toBeDefined();
                    expect(payload.patch).toBeUndefined();
                    browserView = payload.view;
                } else {
                    expect(payload.view).toBeUndefined();
                    expect(payload.baseUpdateId).toBe(payloads[i - 1].updateId);
                    browserView = applyPatch(browserView, payload.patch, true).newDocument;
                }
                expect(browserView[0].data.props.config.nested).toEqual(states[i].value);
                expect(browserView[0].data.props.label).toEqual(states[i].label);
            }
        } finally {
            await onDestroyComponentInstance({ componentInstanceId });
        }
    });
});
