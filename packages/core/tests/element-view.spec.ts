import fs from 'fs';
import path from 'path';
import vm from 'vm';
import ts from 'typescript';
import * as jsonPatch from 'fast-json-patch';

// Exercise the real element's view handler with only the DOM renderer stubbed.
const elementScript = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, '../../element/src/index.ts'), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

async function connectElement(onInit = jest.fn(), elementOptions = {}) {
    let ElementClass;
    let updateProps;
    const viewHandlers = [];
    const reload = jest.fn();
    const render = jest.fn();
    const destroyComponentInstance = jest.fn();
    let instanceCount = 0;
    class HTMLElement {
        isConnected = true;
        getAttribute(name) { return name === 'component' ? 'test' : null; }
        appendChild() { }
    }
    vm.runInNewContext(elementScript, {
        exports: {},
        require: name => name === 'snabbdom' ? {
            init: modules => {
                updateProps = modules[0].update;
                return render;
            },
            h: (sel, data, children) => ({ sel, data, children }),
        } : jsonPatch,
        HTMLElement,
        HTMLInputElement: class HTMLInputElement { },
        customElements: {
            define: (_, cls) => { ElementClass = cls; },
            get: () => HTMLElement,
        },
        document: { createElement: () => ({}) },
        window: {
            location: { reload },
            draymanConfig: {
                elementOptions,
                connection: {
                    onConnectionClose() { },
                    initializeComponent: async () => `instance-${++instanceCount}`,
                    destroyComponentInstance,
                    onEvent: (_, handler) => { viewHandlers.push(handler); },
                },
            },
        },
        console: { error: jest.fn() },
        setTimeout,
        clearTimeout,
    });
    const element = new ElementClass();
    element.onInit = onInit;
    await element.connectedCallback();
    return {
        element, reload, render, viewHandlers, destroyComponentInstance, updateProps,
        send: payload => viewHandlers[viewHandlers.length - 1]({ type: 'view', payload }),
    };
}

const textTree = (text: string) => [{
    sel: 'div', key: '/0', data: { props: {} }, children: [{ text }],
}];

test.each([
    ['object to array', {}, []],
    ['array to object', [], {}],
    ['nested object to array', { nested: {} }, { nested: [] }],
    ['nested array to object', { nested: [] }, { nested: {} }],
])('the prop hook preserves a changed %s container type', async (_, previous, next) => {
    const { updateProps } = await connectElement();
    const oldVnode = { data: { props: { config: previous } } };
    const vnode = { elm: {}, data: { props: { config: next } } };
    updateProps(oldVnode, vnode);
    expect(vnode.data.props.config).toBe(next);
});

test('the prop hook still reuses an unchanged object reference', async () => {
    const { updateProps } = await connectElement();
    const previous = { nested: [1, { value: 'same' }] };
    const next = { nested: [1, { value: 'same' }] };
    const vnode = { elm: {}, data: { props: { config: next } } };
    updateProps({ data: { props: { config: previous } } }, vnode);
    expect(vnode.data.props.config).toBe(previous);
});

test('nonempty patches, skipped IDs, and a replacement snapshot keep the current baseline', async () => {
    const onInit = jest.fn();
    const { element, reload, render, send } = await connectElement(onInit);
    await send({ view: textTree('initial'), updateId: 1 });
    await send({
        patch: [{ op: 'replace', path: '/0/children/0/text', value: 'patched' }],
        baseUpdateId: 1, updateId: 3,
    });
    await send({
        patch: [
            { op: 'add', path: '/0/data/props/title', value: 'title' },
            { op: 'add', path: '/1', value: textTree('added')[0] },
        ],
        baseUpdateId: 3, updateId: 4,
    });
    await send({
        patch: [
            { op: 'remove', path: '/0/data/props/title' },
            { op: 'remove', path: '/1' },
        ],
        baseUpdateId: 4, updateId: 5,
    });
    await send({ view: textTree('replacement'), updateId: 7 });
    await send({
        patch: [
            { op: 'test', path: '/0/children/0/text', value: 'replacement' },
            { op: 'replace', path: '/0/children/0/text', value: 'final' },
        ],
        baseUpdateId: 7, updateId: 8,
    });

    const rendered = render.mock.calls.map(([, vnode]) => vnode.children);
    expect(rendered.map(children => children.map(child => child.children[0]))).toEqual([
        ['initial'], ['patched'], ['patched', 'added'], ['patched'], ['replacement'], ['final'],
    ]);
    expect(rendered[2][0].data.props.title).toBe('title');
    expect(rendered[3][0].data.props).not.toHaveProperty('title');
    expect(element.updateId).toBe(8);
    expect(reload).not.toHaveBeenCalled();
    expect(onInit).toHaveBeenCalledTimes(1);
});

test('event conversion, client options, and renderer mutations cannot change the patch baseline', async () => {
    const { reload, render, send } = await connectElement(jest.fn(), {
        'test-control': { theme: 'client', onChange: { leading: true } },
    });
    const view = [{
        sel: 'test-control', key: '/0', data: {
            props: { theme: 'server', config: { value: 1 }, onChange: { eventGuards: [] } },
        }, children: [],
    }];
    render.mockImplementation((_, vnode) => {
        const props = vnode.children[0].data.props;
        expect(props.theme).toBe('client');
        expect(typeof props.onChange).toBe('function');
        // Match the sort of in-place changes Snabbdom's prop hook can make.
        delete props.theme;
        props.config.value = 'renderer mutation';
    });
    await send({ view, updateId: 1 });
    await send({
        patch: [
            { op: 'test', path: '/0/data/props/theme', value: 'server' },
            { op: 'test', path: '/0/data/props/onChange', value: { eventGuards: [] } },
            { op: 'test', path: '/0/data/props/config/value', value: 1 },
            { op: 'replace', path: '/0/data/props/config/value', value: 2 },
        ],
        baseUpdateId: 1, updateId: 2,
    });
    await send({
        patch: [
            { op: 'test', path: '/0/data/props/config/value', value: 2 },
            { op: 'replace', path: '/0/data/props/config/value', value: 3 },
        ],
        baseUpdateId: 2, updateId: 3,
    });
    expect(reload).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalledTimes(3);
});

test('stale and duplicate updates do not render or disturb the accepted baseline', async () => {
    const { element, reload, render, send } = await connectElement();
    await send({ view: textTree('accepted'), updateId: 3 });
    await send({ view: textTree('stale'), updateId: 2 });
    await send({
        patch: [{ op: 'replace', path: '/0/children/0/text', value: 'duplicate' }],
        baseUpdateId: 3, updateId: 3,
    });
    await send({
        patch: [
            { op: 'test', path: '/0/children/0/text', value: 'accepted' },
            { op: 'replace', path: '/0/children/0/text', value: 'next' },
        ],
        baseUpdateId: 3, updateId: 6,
    });
    expect(render).toHaveBeenCalledTimes(2);
    expect(render.mock.calls[1][1].children[0].children).toEqual(['next']);
    expect(element.updateId).toBe(6);
    expect(reload).not.toHaveBeenCalled();
});

test.each([
    ['baseline mismatch', { baseUpdateId: 0, patch: [] }],
    ['unknown operation', { baseUpdateId: 1, patch: [{ op: 'unknown', path: '/0' }] }],
    ['invalid path after partial application', {
        baseUpdateId: 1, patch: [
            { op: 'replace', path: '/0/children/0/text', value: 'partial' },
            { op: 'remove', path: '/99' },
        ],
    }],
    ['invalid resulting root', { baseUpdateId: 1, patch: [{ op: 'replace', path: '', value: {} }] }],
    ['missing view and patch', {}],
    ['protected prototype path', {
        baseUpdateId: 1, patch: [{ op: 'add', path: '/0/data/props/__proto__', value: {} }],
    }],
])('%s reloads once and stops an initialized view stream', async (_, payload) => {
    const onInit = jest.fn();
    const { element, reload, render, send } = await connectElement(onInit);
    await send({ view: textTree('initial'), updateId: 1 });
    await send({ ...payload, updateId: 2 });
    await send({ view: textTree('ignored'), updateId: 3 });
    expect(reload).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(1);
    expect(element.updateId).toBe(1);
    expect(onInit).toHaveBeenCalledTimes(1);
});

test.each([
    ['missing update ID', { view: [] }],
    ['invalid update ID', { view: [], updateId: 1.5 }],
    ['both snapshot and patch', { view: [], patch: [], baseUpdateId: 1, updateId: 2 }],
    ['null snapshot', { view: null, updateId: 2 }],
    ['non-array patch', { patch: 'invalid', baseUpdateId: 1, updateId: 2 }],
])('%s abandons the malformed view stream', async (_, payload) => {
    const { reload, render, send } = await connectElement();
    await send(payload);
    await send({ view: [], updateId: 3 });
    expect(reload).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
});

test('remount resets the baseline and ignores messages from the old connection generation', async () => {
    const onInit = jest.fn();
    const { element, reload, render, send, viewHandlers, destroyComponentInstance } = await connectElement(onInit);
    await send({ view: textTree('old instance'), updateId: 5 });
    const oldHandler = viewHandlers[0];
    element.disconnectedCallback();
    expect(destroyComponentInstance).toHaveBeenCalledWith({ componentInstanceId: 'instance-1' });
    await element.connectedCallback();
    expect(element.updateId).toBe(0);
    await oldHandler({ type: 'view', payload: { view: textTree('stale instance'), updateId: 99 } });
    await send({ view: textTree('new instance'), updateId: 1 });
    await send({
        patch: [{ op: 'replace', path: '/0/children/0/text', value: 'new patch' }],
        baseUpdateId: 1, updateId: 2,
    });
    expect(render).toHaveBeenCalledTimes(3);
    expect(render.mock.calls[2][1].children[0].children).toEqual(['new patch']);
    expect(element.updateId).toBe(2);
    expect(reload).not.toHaveBeenCalled();
    expect(onInit).toHaveBeenCalledTimes(2);
});

test('an application onInit exception does not reload or abandon the view stream', async () => {
    const error = new Error('Application init failed');
    const onInit = jest.fn(() => { throw error; });
    const { element, reload, render, send } = await connectElement(onInit);
    await expect(send({ view: [], updateId: 1 })).rejects.toBe(error);
    expect(reload).not.toHaveBeenCalled();
    expect(element.updateId).toBe(1);
    await send({ patch: [], baseUpdateId: 1, updateId: 3 });
    expect(element.updateId).toBe(3);
    expect(render).toHaveBeenCalledTimes(2);
    expect(onInit).toHaveBeenCalledTimes(1);
});

test('a failed patch reloads once without invoking onInit or accepting more views', async () => {
    const onInit = jest.fn();
    const { reload, render, send } = await connectElement(onInit);
    await send({ patch: [], baseUpdateId: 1, updateId: 2 });
    await send({ view: [], updateId: 3 });
    expect(reload).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
    expect(onInit).not.toHaveBeenCalled();
});
