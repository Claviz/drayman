import { componentInstances, handleComponentEvent, saveComponent, handleEventHubEvent, onDestroyComponentInstance, onInitializeComponentInstance, getElementsScriptPaths, onDisconnect, onUpdateComponentInstanceProps, onHandleBrowserCallback } from '../dist';
import { applyPatch } from 'fast-json-patch';
import fs from 'fs-extra';
import path from 'path';

describe('', () => {

    const onError = jest.fn();
    const onSuccess = jest.fn();
    let warnSpy: jest.SpyInstance;

    function makeIds() {
        const name = (expect.getState().currentTestName ?? 'unknown')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 80);

        return {
            componentInstanceId: `${name}__component`,
            connectionId: `${name}__connection`,
        };
    }

    beforeAll(async () => {
        const scripts = [
            'buttons',
            'heap-memory-limit-reach',
            'external-memory-limit-reach',
            'freeze',
            'on-destroy-freeze',
            'on-init-freeze',
            'cancel-late-response',
            'child',
            'parent',
            'identical-view',
            'update-props',
            'view-container-types'
        ];
        for (const scriptName of scripts) {
            const script = await fs.readFile(`./tests/components/${scriptName}.tsx`, 'utf-8');
            await saveComponent({ script, scriptPath: `./tests/components/${scriptName}.tsx`, outputFile: `./tests/dist/components/${scriptName}.js` });
        }
    });

    beforeEach(() => {
        jest.resetAllMocks();
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        warnSpy.mockRestore();
    });

    test('elements paths', async () => {
        const elementPaths = await getElementsScriptPaths({ nodeModulesPath: path.join(__dirname, '../../framework/node_modules') });
        const pathsWithRelativeRemoved = {};
        for (const element of Object.keys(elementPaths)) {
            pathsWithRelativeRemoved[element] = path.relative(__dirname, elementPaths[element]).replace(/\\/g, '/');
        }
        expect(pathsWithRelativeRemoved).toMatchSnapshot();
    });

    test('component user interaction', async () => {
        const consoleMessages = [];
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const { componentInstanceId, connectionId } = makeIds();
            const messages = [];
            onInitializeComponentInstance({
                serverCommands: [],
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { consoleMessages.push(text) },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId,
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            handleComponentEvent({
                                componentInstanceId,
                                eventName: '/0/button/click',
                                files: [],
                                options: {},
                                onError,
                                onSuccess: () => {
                                    onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                                },
                            });
                            return;
                        }
                        case 2: {
                            return;
                        }
                        case 3: {
                            expect(componentInstances[componentInstanceId]).not.toBeDefined();
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(consoleMessages).toMatchSnapshot();
    });

    test('trying to perform event on non-existing component instance result in an error', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const logs: string[] = [];
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { logs.push(text) },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            handleComponentEvent({
                                componentInstanceId: 'non-existing-instance',
                                eventName: '/0/button/onClick',
                                files: [],
                                options: {},
                                onError: () => {
                                    onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                                },
                                onSuccess,
                            });
                            return;
                        }
                        case 2: {
                            expect(componentInstances[componentInstanceId]).not.toBeDefined();
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(logs[0].startsWith('ComponentInstance object has id:')).toBe(true);
        expect(logs[1].startsWith('destroyed!')).toBe(true);
        expect(messages).toMatchSnapshot();
    });

    test('component fails to render due to instant external memory overload', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'external-memory-limit-reach',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(
            warnSpy.mock.calls.map(args => args[0]).some(msg =>
                msg.startsWith(`Memory limit exceeded`) &&
                msg.includes(componentInstanceId)
            )
        ).toBe(true);
    });

    test('component fails to render due to instant heap memory overload', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const { componentInstanceId, connectionId } = makeIds();
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'heap-memory-limit-reach',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                heapLimit: 64,
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
    });

    test('component destroys gracefully if it is initially frozen', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'freeze',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(warnSpy).toHaveBeenCalledWith(
            `Heartbeat limit reached (3000 ms) — stopping ${componentInstanceId} (freeze)`
        );
    });

    test('component destroys gracefully if onDestroy causes freeze', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const events: any[] = [];
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'on-destroy-freeze',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                onComponentInstanceEvent: (event) => {
                    events.push(event);
                },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(warnSpy).toHaveBeenCalledWith(
            `Handle destroy component instance failed for ${componentInstanceId} (on-destroy-freeze)`,
            expect.any(Error)
        );
        const errArg = warnSpy.mock.calls.find(
            (c) => String(c[0]).startsWith('Handle destroy component instance failed for')
        )?.[1];
        expect(String(errArg?.message)).toBe('Timed out after 3000 ms');
        expect(events.find((event) => event.kind === 'warn' && event.message.startsWith('Handle destroy component instance failed for'))).toMatchObject({
            id: componentInstanceId,
            kind: 'warn',
            status: 'success',
            endReason: 'user stopped',
        });
        expect(events.find((event) => event.kind === 'lifecycle' && event.lifecycleEvent === 'component_ended')).toMatchObject({
            id: componentInstanceId,
            kind: 'lifecycle',
            lifecycleEvent: 'component_ended',
            status: 'success',
            endReason: 'user stopped',
            endTime: expect.any(Date),
            durationMs: expect.any(Number),
        });
    });

    test('component lifecycle event stream exposes lifecycle metadata', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        let resolveLegacyDestroyed: () => void = () => { };
        const legacyDestroyed = new Promise<void>((resolve) => {
            resolveLegacyDestroyed = resolve;
        });
        const events: any[] = [];
        const messages: any[] = [];

        onInitializeComponentInstance({
            browserCommands: [],
            onComponentInstanceConsole: () => { },
            componentInstanceId,
            componentName: 'buttons',
            componentRootDir: 'tests/dist/components',
            connectionId,
            namespaceId: 'branch-1',
            meta: { userId: 'user-1' },
            serverCommands: [],
            componentOptions: { text: 'Hello, world!' },
            onComponentInstanceEvent: (event) => {
                events.push(event);
            },
            emit: async (message) => {
                messages.push(message);
                if (message.type === 'view') {
                    onDestroyComponentInstance({ componentInstanceId });
                    return;
                }
                if (message.type === 'componentInstanceDestroyed') {
                    resolveLegacyDestroyed();
                }
            },
        });

        await legacyDestroyed;

        const initializedPayload = events.find((event) => event.kind === 'lifecycle' && event.lifecycleEvent === 'component_started');
        const destroyedPayload = events.find((event) => event.kind === 'lifecycle' && event.lifecycleEvent === 'component_ended');
        expect(initializedPayload).toMatchObject({
            id: componentInstanceId,
            entityId: 'buttons',
            type: 'component',
            kind: 'lifecycle',
            status: 'processing',
            lifecycleEvent: 'component_started',
            branchId: 'branch-1',
            connectionId,
            userId: 'user-1',
            heapUsed: 0,
            externalUsed: 0,
            endReason: null,
            endTime: null,
            durationMs: null,
        });
        expect(destroyedPayload).toMatchObject({
            id: componentInstanceId,
            entityId: 'buttons',
            type: 'component',
            kind: 'lifecycle',
            status: 'success',
            lifecycleEvent: 'component_ended',
            branchId: 'branch-1',
            connectionId,
            userId: 'user-1',
            endReason: 'user stopped',
            endTime: expect.any(Date),
            durationMs: expect.any(Number),
        });
        expect(messages.some(message => message.type === 'componentInstanceDestroyed')).toBe(true);
    });

    test('component destroys gracefully if onInit is frozen', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const { componentInstanceId, connectionId } = makeIds();
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'on-init-freeze',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
    });

    test('cancel() on a real component event prevents callbacks even if the worker responds later', async () => {
        jest.useRealTimers();

        const { componentInstanceId, connectionId } = makeIds();
        const calls: { type; payload; componentInstanceId }[] = [];
        const onSuccess = jest.fn();
        const onError = jest.fn();

        await new Promise<void>((resolve) => {
            onInitializeComponentInstance({
                browserCommands: [],
                serverCommands: [],
                onComponentInstanceConsole: () => { },
                componentInstanceId,
                componentName: 'cancel-late-response',
                componentRootDir: 'tests/dist/components',
                connectionId,
                componentOptions: {},
                emit: async (message) => {
                    calls.push(message);
                    if (calls.length === 1) {
                        const { cancel } = handleComponentEvent({
                            componentInstanceId,
                            eventName: '/0/button/onClick',
                            files: [],
                            options: {},
                            onSuccess,
                            onError,
                        });
                        cancel();
                        resolve();
                    }
                },
            });
        });

        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        await onDestroyComponentInstance({ componentInstanceId });
    });

    test('should not recreate child component when already initialized', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const logs: string[] = [];
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => {
                    logs.push(text)
                },
                componentInstanceId,
                componentName: 'parent',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            expect(message.type).toEqual('view');
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('view');
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 3: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(logs.length).toBe(4);
        expect(logs[0]).toEqual('PARENT init\n');
        expect(logs[1]).toEqual('PARENT forceUpdate()\n');
        expect(logs[2]).toEqual('CHILD init\n');
        expect(logs[3]).toEqual('CHILD init\n');
    });

    test('should not send new view if identical', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { },
                componentInstanceId,
                componentName: 'identical-view',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: {},
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            expect(message.type).toEqual('view');
                            setTimeout(() => {
                                onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            }, 1000);
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages.length).toBe(2);
        expect(messages[0].type).toBe('view');
        expect(messages[1].type).toBe('componentInstanceDestroyed');
    });

    test('should destroy component on disconnect', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            onDisconnect({ connectionId });
                            return;
                        }
                        case 2: {
                            expect(message.type).toEqual('componentInstanceDestroyed');
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages.length).toBe(2);
    });

    test('snapshots container type changes and resumes patches from the new baseline', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        const states = [
            { value: {}, label: 'initial' },
            { value: [], label: 'initial' },
            { value: {}, label: 'also changed' },
            { value: {}, label: 'patch again' },
        ];
        const payloads: any[] = [];
        let view;
        try {
            await new Promise<void>((resolve, reject) => {
                onInitializeComponentInstance({
                    browserCommands: [],
                    onComponentInstanceConsole: () => { },
                    componentInstanceId,
                    componentName: 'view-container-types',
                    componentRootDir: 'tests/dist/components',
                    connectionId,
                    serverCommands: [],
                    componentOptions: states[0],
                    emit: (message) => {
                        if (message.type !== 'view') return;
                        try {
                            const index = payloads.length;
                            const payload = message.payload;
                            payloads.push(payload);
                            if (index < 3) {
                                expect(payload.view).toBeDefined();
                                expect(payload.patch).toBeUndefined();
                                view = payload.view;
                            } else {
                                expect(payload.view).toBeUndefined();
                                expect(payload.baseUpdateId).toBe(payloads[index - 1].updateId);
                                view = applyPatch(view, payload.patch, true).newDocument;
                            }
                            expect(view[0].data.props.config.nested).toEqual(states[index].value);
                            expect(view[0].data.props.label).toBe(states[index].label);
                            if (payloads.length === states.length) resolve();
                            else onUpdateComponentInstanceProps({ componentInstanceId, options: states[index + 1] });
                        } catch (error) {
                            reject(error);
                        }
                    },
                }).catch(reject);
            });
        } finally {
            await onDestroyComponentInstance({ componentInstanceId });
        }
    });

    test('should update component props', async () => {
        const { componentInstanceId, connectionId } = makeIds();
        let view;
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { },
                componentInstanceId,
                componentName: 'update-props',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: { text: 'initial' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            view = message.payload.view;
                            expect(view[0].children[0].text).toBe('initial');
                            onUpdateComponentInstanceProps({
                                componentInstanceId,
                                options: { text: 'updated' }
                            });
                            return;
                        }
                        case 2: {
                            view = message.payload.view !== undefined
                                ? message.payload.view
                                : applyPatch(view, message.payload.patch).newDocument;
                            expect(view[0].children[0].text).toBe('updated');
                            onDestroyComponentInstance({ componentInstanceId });
                            return;
                        }
                        case 3: {
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages.length).toBe(3);
    });

    test('destroy requested before registration is applied once initialization finishes', async () => {
        jest.resetModules();

        const componentInstanceId = 'destroy-before-registration__component';
        const connectionId = 'destroy-before-registration__connection';
        const emit = jest.fn();
        const handleDestroyComponentInstance = jest.fn().mockResolvedValue(undefined);
        const unsubscribe = jest.fn();
        let releaseSpawn = () => { };
        const waitForSpawn = new Promise<void>((resolve) => {
            releaseSpawn = resolve;
        });

        try {
            jest.doMock('threads', () => ({
                Worker: jest.fn().mockImplementation(() => ({
                    addEventListener: jest.fn(),
                })),
                Thread: {
                    terminate: jest.fn().mockResolvedValue(undefined),
                },
                spawn: jest.fn().mockImplementation(async () => {
                    await waitForSpawn;
                    return {
                        events: () => ({
                            subscribe: () => ({ unsubscribe }),
                        }),
                        initializeComponentInstance: jest.fn(),
                        handleDestroyComponentInstance,
                    };
                }),
            }));

            const isolatedCore = require('../dist');
            const destroyed = new Promise<any>((resolve) => {
                emit.mockImplementation((message) => {
                    if (message.type === 'componentInstanceDestroyed') {
                        resolve(message);
                    }
                });
            });

            const initPromise = isolatedCore.onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: () => { },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: { text: 'Hello, world!' },
                emit,
            });

            await isolatedCore.onDestroyComponentInstance({ componentInstanceId });
            expect(isolatedCore.componentInstances[componentInstanceId]).not.toBeDefined();

            releaseSpawn();
            await initPromise;

            const destroyedMessage = await destroyed;
            expect(handleDestroyComponentInstance).toHaveBeenCalledTimes(1);
            expect(unsubscribe).toHaveBeenCalledTimes(1);
            expect(isolatedCore.componentInstances[componentInstanceId]).not.toBeDefined();
            expect(destroyedMessage).toEqual(expect.objectContaining({
                type: 'componentInstanceDestroyed',
                componentInstanceId,
            }));
        } finally {
            jest.unmock('threads');
            jest.resetModules();
        }
    });

    test('disconnect requested before registration is applied once initialization finishes', async () => {
        jest.resetModules();

        const componentInstanceId = 'disconnect-before-registration__component';
        const connectionId = 'disconnect-before-registration__connection';
        const emit = jest.fn();
        const handleDestroyComponentInstance = jest.fn().mockResolvedValue(undefined);
        const unsubscribe = jest.fn();
        let releaseSpawn = () => { };
        const waitForSpawn = new Promise<void>((resolve) => {
            releaseSpawn = resolve;
        });

        try {
            jest.doMock('threads', () => ({
                Worker: jest.fn().mockImplementation(() => ({
                    addEventListener: jest.fn(),
                })),
                Thread: {
                    terminate: jest.fn().mockResolvedValue(undefined),
                },
                spawn: jest.fn().mockImplementation(async () => {
                    await waitForSpawn;
                    return {
                        events: () => ({
                            subscribe: () => ({ unsubscribe }),
                        }),
                        initializeComponentInstance: jest.fn(),
                        handleDestroyComponentInstance,
                    };
                }),
            }));

            const isolatedCore = require('../dist');
            const destroyed = new Promise<any>((resolve) => {
                emit.mockImplementation((message) => {
                    if (message.type === 'componentInstanceDestroyed') {
                        resolve(message);
                    }
                });
            });

            const initPromise = isolatedCore.onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: () => { },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId,
                serverCommands: [],
                componentOptions: { text: 'Hello, world!' },
                emit,
            });

            await isolatedCore.onDisconnect({ connectionId });
            expect(isolatedCore.componentInstances[componentInstanceId]).not.toBeDefined();

            releaseSpawn();
            await initPromise;

            const destroyedMessage = await destroyed;
            expect(handleDestroyComponentInstance).toHaveBeenCalledTimes(1);
            expect(unsubscribe).toHaveBeenCalledTimes(1);
            expect(isolatedCore.componentInstances[componentInstanceId]).not.toBeDefined();
            expect(destroyedMessage).toEqual(expect.objectContaining({
                type: 'componentInstanceDestroyed',
                componentInstanceId,
            }));
        } finally {
            jest.unmock('threads');
            jest.resetModules();
        }
    });

});
