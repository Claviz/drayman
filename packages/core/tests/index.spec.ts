import { componentInstances, handleComponentEvent, saveComponent, handleEventHubEvent, onDestroyComponentInstance, onInitializeComponentInstance, getElementsScriptPaths } from '../dist';
import fs from 'fs-extra';
import path from 'path';

describe('', () => {

    const onError = jest.fn();
    const onSuccess = jest.fn();

    beforeAll(async () => {
        const script = await fs.readFile('./tests/components/buttons.tsx', 'utf-8');
        await saveComponent({ script, scriptPath: './tests/components/buttons.tsx', outputFile: './tests/dist/components/buttons.js' });
    });

    beforeEach(() => {
        jest.resetAllMocks();
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
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                serverCommands: [],
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { consoleMessages.push(text) },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId: 'connection-1',
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        // received initial view
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
                        // received view after button click
                        case 2: {
                            return;
                        }
                        // received message about component destroy
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
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-2';
            const messages = [];
            onInitializeComponentInstance({
                browserCommands: [],
                onComponentInstanceConsole: ({ text }) => { console.log(text) },
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/dist/components',
                connectionId: 'connection-2',
                serverCommands: [],
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        // received initial view
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
                        // received message about component destroy
                        case 2: {
                            expect(componentInstances[componentInstanceId]).not.toBeDefined();
                            resolve(messages);
                        }
                    }
                },
            });
        }))();
        expect(messages).toMatchSnapshot();
    });

    // test('navigating', async () => {
    //     const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
    //         const componentInstanceId = 'instance-1';
    //         const messages = [];
    //         onInitializeComponentInstance({
    //             browserCommands: [],
    //             onComponentInstanceConsole: ({ text }) => { console.log(text) },
    //             componentInstanceId,
    //             componentName: 'buttons',
    //             componentRootDir: 'tests/dist/components',
    //             connectionId: 'connection-1',
    //             componentOptions: { text: 'Hello, world!' },
    //             emit: async (message) => {
    //                 messages.push(message);
    //                 switch (messages.length) {
    //                     case 1: {
    //                         handleComponentEvent({
    //                             componentInstanceId,
    //                             eventName: '/3/button/onClick',
    //                             files: [],
    //                             options: {},
    //                             onError,
    //                             onSuccess: () => {
    //                                 onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
    //                             },
    //                         });
    //                         return;
    //                     }
    //                     case 2: {
    //                         return;
    //                     }
    //                     case 3: {
    //                         resolve(messages);
    //                     }
    //                 }
    //             },
    //         });
    //     }))();
    //     expect(messages).toMatchSnapshot();
    // });

    // test('should change location for specific connection', async () => {
    //     const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
    //         const componentInstanceId = 'instance-1';
    //         const messages = [];
    //         onInitializeComponentInstance({
    //             browserCommands: [],
    //             onComponentInstanceConsole: ({ text }) => { console.log(text) },
    //             componentInstanceId,
    //             componentName: 'buttons',
    //             componentRootDir: 'tests/dist/components',
    //             connectionId: 'connection-1',
    //             componentOptions: { text: 'Hello, world!' },
    //             emit: async (message) => {
    //                 messages.push(message);
    //                 switch (messages.length) {
    //                     case 1: {
    //                         onLocationChange({
    //                             connectionId: 'connection-1',
    //                             location: { href: 'http://localhost/login' },
    //                         });
    //                         return;
    //                     }
    //                     case 2: {
    //                         onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
    //                         return;
    //                     }
    //                     case 3: {
    //                         resolve(messages);
    //                     }
    //                 }
    //             },
    //         });
    //     }))();
    //     expect(messages).toMatchSnapshot();
    // });

    // test('should not change location for other connection', async () => {
    //     const send = jest.fn();
    //     const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
    //         const componentInstanceId = 'instance-1';
    //         const messages = [];
    //         onInitializeComponentInstance({
    //             browserCommands: [],
    //             onComponentInstanceConsole: ({ text }) => { console.log(text) },
    //             componentInstanceId,
    //             componentName: 'buttons',
    //             componentRootDir: 'tests/dist/components',
    //             connectionId: 'connection-1',
    //             componentOptions: { text: 'Hello, world!' },
    //             emit: async (message) => {
    //                 messages.push(message);
    //                 switch (messages.length) {
    //                     case 1: {
    //                         componentInstances[componentInstanceId].worker.handleLocationChange = send;
    //                         onLocationChange({
    //                             connectionId: 'connection-2',
    //                             location: { href: 'http://localhost/login' },
    //                         });
    //                         onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
    //                         return;
    //                     }
    //                     case 2: {
    //                         resolve(messages);
    //                     }
    //                 }
    //             },
    //         });
    //     }))();
    //     expect(messages).toMatchSnapshot();
    //     expect(send.mock.calls.length).toEqual(0);
    //     expect(onError.mock.calls.length).toEqual(0);
    //     expect(onSuccess.mock.calls.length).toEqual(0);
    // });
});
