import { componentInstances, handleComponentEvent, handleEventHubEvent, onDestroyComponentInstance, onInitializeComponentInstance, onLocationChange } from '../src';
import path from 'path';


describe('', () => {

    const onError = jest.fn();
    const onSuccess = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('component user interaction', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/components',
                connectionId: 'connection-1',
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            handleComponentEvent({
                                componentInstanceId,
                                eventName: '/0/button/onClick',
                                files: [],
                                options: {},
                                onError,
                                onSuccess,
                            });
                            expect(Object.values(componentInstances[componentInstanceId].eventRequests)[0]).toEqual({ onError, onSuccess });
                            return;
                        }
                        case 2: {
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 3: {
                            expect(componentInstances[componentInstanceId]).not.toBeDefined();
                            resolve(messages);
                        }
                    }
                },
                location: { href: 'http://localhost' }
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(onError.mock.calls.length).toEqual(0);
        expect(onSuccess.mock.calls.length).toEqual(1);
    });

    test('trying to perform event on non-existing component instance result in an error', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/components',
                connectionId: 'connection-1',
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
                                onError,
                                onSuccess,
                            });
                            expect(componentInstances[componentInstanceId].eventRequests).toEqual({});
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 2: {
                            resolve(messages);
                        }
                    }
                },
                location: { href: 'http://localhost' }
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(onError.mock.calls.length).toEqual(1);
        expect(onSuccess.mock.calls.length).toEqual(0);
    });

    test('navigating', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/components',
                connectionId: 'connection-1',
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            handleComponentEvent({
                                componentInstanceId,
                                eventName: '/3/button/onClick',
                                files: [],
                                options: {},
                                onError,
                                onSuccess,
                            });
                            return;
                        }
                        case 2: {
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 3: {
                            resolve(messages);
                        }
                    }
                },
                location: { href: 'http://localhost' }
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(onError.mock.calls.length).toEqual(0);
        expect(onSuccess.mock.calls.length).toEqual(1);
    });

    test('should change location for specific connection', async () => {
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/components',
                connectionId: 'connection-1',
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            onLocationChange({
                                connectionId: 'connection-1',
                                location: { href: 'http://localhost/login' },
                            });
                            return;
                        }
                        case 2: {
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 3: {
                            resolve(messages);
                        }
                    }
                },
                location: { href: 'http://localhost' }
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(onError.mock.calls.length).toEqual(0);
        expect(onSuccess.mock.calls.length).toEqual(0);
    });

    test('should not change location for other connection', async () => {
        const send = jest.fn();
        const messages = await (() => new Promise<{ type, payload, componentInstanceId }[]>((resolve, reject) => {
            const componentInstanceId = 'instance-1';
            const messages = [];
            onInitializeComponentInstance({
                componentInstanceId,
                componentName: 'buttons',
                componentRootDir: 'tests/components',
                connectionId: 'connection-1',
                componentOptions: { text: 'Hello, world!' },
                emit: async (message) => {
                    messages.push(message);
                    switch (messages.length) {
                        case 1: {
                            componentInstances[componentInstanceId].process.send = send;
                            onLocationChange({
                                connectionId: 'connection-2',
                                location: { href: 'http://localhost/login' },
                            });
                            onDestroyComponentInstance({ componentInstanceId: componentInstanceId });
                            return;
                        }
                        case 2: {
                            resolve(messages);
                        }
                    }
                },
                location: { href: 'http://localhost' }
            });
        }))();
        expect(messages).toMatchSnapshot();
        expect(send.mock.calls.length).toEqual(0);
        expect(onError.mock.calls.length).toEqual(0);
        expect(onSuccess.mock.calls.length).toEqual(0);
    });
});