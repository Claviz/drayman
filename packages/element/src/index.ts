import {
    init,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
    attributesModule,
    VNode,
} from 'snabbdom';
import { applyPatch } from 'fast-json-patch';

function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
        if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
        if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
}

function updateProps(oldVnode: VNode, vnode: VNode): void {
    const element = vnode.elm as any;
    const oldProps = oldVnode.data?.props || {};
    const props = vnode.data?.props || {};
    for (const key of Object.keys(oldProps)) {
        if (props[key] === undefined) {
            props[key] = null;
        }
    }
    if (element instanceof HTMLInputElement && element === document.activeElement) {
        delete vnode?.data?.props?.value;
    }
    for (const key of Object.keys(props)) {
        const newVal = props[key];
        const oldVal = oldProps[key];

        if (typeof newVal === 'object' && newVal && oldVal && deepEqual(newVal, oldVal)) {
            props[key] = oldVal;
        }
    }
}

function maskMatch(original = {}, mask = {}) {
    let match = true;
    for (const key in mask) {
        if (typeof mask[key] === 'object') {
            match = match && maskMatch(original[key], mask[key]);
        } else {
            match = match && original[key] === mask[key];
        }
    }
    return match;
}

function mergeEventOptions(currentOptions, configuredOptions) {
    if (typeof currentOptions === 'object' && currentOptions &&
        typeof configuredOptions === 'object' && configuredOptions) {
        return { ...currentOptions, ...configuredOptions };
    }
    return configuredOptions;
}

const patch = init([
    { update: updateProps, create: updateProps },
    attributesModule,
    propsModule,
    styleModule,
    eventListenersModule
]);

function mapEvent(event): EventOptions {
    if (event instanceof KeyboardEvent) {
        return {
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            code: event.code,
            key: event.key,
            location: event.location,
            repeat: event.repeat,
        }
    } else if (event instanceof MouseEvent) {
        return {
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            x: event.x,
            y: event.y,
            pageX: event.pageX,
            pageY: event.pageY,
            screenX: event.screenX,
            screenY: event.screenY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
        }
    } else if (['input', 'change'].includes(event.type)) {
        const target = event.target as HTMLInputElement;
        if (target.tagName.toLowerCase() === 'select') {
            const selectTarget = event.target as HTMLSelectElement;
            const selected = [...selectTarget.options].filter(x => x.selected).map(x => x.value);
            return { value: selectTarget.multiple ? selected : selected[0] };
        }
        return target.type === 'checkbox' ? { value: target.checked } : { value: target.value };
    }
}

const createdElements = {};

customElements.define('drayman-element', class extends HTMLElement {
    componentInstanceId = '';
    previouslySerializedTree = [];
    events = {};
    rootEvents = {};
    onInit?: (() => Promise<void>) | (() => void);
    onInitFailed?: (() => Promise<void>) | (() => void);
    onDestroy?: (() => Promise<void>) | (() => void);

    get options() {
        return this.getAttribute('options');
    }

    set options(value) {
        if (value && typeof value !== 'string') {
            const options = {};
            for (const key of Object.keys(value)) {
                if (isEvent(key)) {
                    this.rootEvents[key] = value[key];
                    options[key] = true;
                } else {
                    options[key] = value[key];
                }
            }
            this.setAttribute('options', JSON.stringify(options));
        } else {
            this.setAttribute('options', value);
        }
    }

    get component() {
        return this.getAttribute('component');
    }

    set component(value) {
        this.setAttribute('component', value);
    }

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['options'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'options' && window['draymanConfig']) {
            window['draymanConfig'].connection.updateComponentInstanceProps({ componentInstanceId: this.componentInstanceId, options: this.options });
        }
    }

    connectionGeneration = 0;

    destroyComponentInstance(componentInstanceId = this.componentInstanceId) {
        if (!componentInstanceId) {
            return;
        }
        if (this.componentInstanceId === componentInstanceId) {
            this.componentInstanceId = '';
        }
        window['draymanConfig']?.connection?.destroyComponentInstance({ componentInstanceId });
    }

    debounce(eventName, wait, options, elementOptions) {
        let timeout;
        let toReject;
        return (event, c, d) => {
            return new Promise(async (resolve, reject) => {
                let later = async () => {
                    timeout = null;
                    if (options.trailing) {
                        if (event instanceof Event) {
                            resolve(await this.emit(event, eventName, { trailing: true }, { ...mapEvent(event), ...(c || {}) }, d, elementOptions));
                        } else {
                            resolve(await this.emit(null, eventName, { trailing: true }, event, c, elementOptions));
                        }
                    }
                };
                let callNow = options.leading && !timeout;
                clearTimeout(timeout);
                if (toReject) {
                    toReject();
                }
                timeout = setTimeout(later, wait);
                toReject = reject;
                if (callNow) {
                    if (event instanceof Event) {
                        resolve(await this.emit(event, eventName, { leading: true }, { ...mapEvent(event), ...(c || {}) }, d, elementOptions));
                    } else {
                        resolve(await this.emit(null, eventName, { leading: true }, event, c, elementOptions));
                    }
                }
            }).catch(() => { });
        };
    }

    eventDebounce(fn, wait) {
        let timeout;
        return (callbackId, data) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const result = fn(callbackId, data);
                if (this.browserCommandDebouncedCallbacks[callbackId]) {
                    delete this.browserCommandDebouncedCallbacks[callbackId];
                }
                return result;
            }, wait);
        };
    }

    getFn(element, eventName, elementOptions) {
        if (typeof elementOptions === 'object') {
            if (elementOptions.debounce) {
                let wait = typeof elementOptions.debounce === 'number' ? elementOptions.debounce : elementOptions.debounce.wait;
                let trailing = typeof elementOptions.debounce === 'number' ? true : !!elementOptions.debounce?.trailing;
                let leading = !!elementOptions.debounce?.leading;
                const debounced = this.debounce(
                    eventName, wait, { trailing, leading }, elementOptions
                );
                return debounced;
            }
        }
        return async (event, c, d) => {
            if (event instanceof Event) {
                return await this.emit(event, eventName, null, { ...mapEvent(event), ...(c || {}) }, d, elementOptions);
            } else {
                return await this.emit(null, eventName, null, event, c, elementOptions);
            }
        };
    }

    emit = async (event: Event, eventName: string, info = {}, options = {}, files: any[] = [], elementOptions: any = {}) => {
        const matched = elementOptions.eventGuards?.find(x => maskMatch(options, x.mask));
        if (!elementOptions.eventGuards?.length || matched) {
            if (matched?.preventDefault) {
                event?.preventDefault?.();
            }
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('componentInstanceId', this.componentInstanceId);
            formData.append('options', JSON.stringify({ ...info, ...options }));
            for (let file of files) {
                formData.append('file', file.file, file.fileName);
            }
            return await window['draymanConfig']?.connection.postFormData(formData);
        }
    }

    traverseTree(child: { sel: any; data: any; children: any; text: any; key: string; }): any {
        if (window['draymanConfig'].elementOptions) {
            for (const [currentElement, currentElementOption] of Object.entries(window['draymanConfig'].elementOptions)) {
                if (child.sel === currentElement) {
                    if (child.sel?.includes('-')) {
                        const props = { ...child.data.props };
                        for (const [option, configuredValue] of Object.entries(currentElementOption)) {
                            if (!isEvent(option)) {
                                props[option] = configuredValue;
                            } else if (Object.prototype.hasOwnProperty.call(child.data.props || {}, option)) {
                                props[option] = mergeEventOptions(child.data.props[option], configuredValue);
                            }
                        }
                        child.data.props = props;
                    } else {
                        const props = {};
                        const events = {};
                        for (const option of Object.keys(currentElementOption)) {
                            if (isEvent(option)) {
                                const eventName = option.substring(2).toLowerCase();
                                if (Object.prototype.hasOwnProperty.call(child.data.on || {}, eventName)) {
                                    events[eventName] = mergeEventOptions(child.data.on[eventName], currentElementOption[option]);
                                }
                            } else {
                                props[option] = currentElementOption[option];
                            }
                        }
                        child.data.props = { ...child.data.props, ...(props as any) };
                        child.data.on = { ...child.data.on, ...(events as any) };
                    }
                }
            }
        }
        if (child.sel?.includes('-')) {
            for (const option of Object.keys(child.data.props || {})) {
                if (isEvent(option)) {
                    if (!this.events[`${child.key}/${option}`]) {
                        this.events[`${child.key}/${option}`] = this.getFn(child.sel, `${child.key}/${option}`, child.data.props[option]);
                    }
                    child.data.props[option] = this.events[`${child.key}/${option}`];
                }
            }
            if (!customElements.get(child.sel) && !createdElements[child.sel]) {
                createdElements[child.sel] = true;
                const my_awesome_script = document.createElement('script');
                my_awesome_script.setAttribute('src', `${window['draymanConfig'].elementUrl}${child.sel}`);
                document.head.appendChild(my_awesome_script);
            }
            return h(
                child.sel,
                child.data,
                child.children.map(x => x.sel ? this.traverseTree(x) : x.text)
            );
        }
        for (const optionName of Object.keys(child.data?.on || {})) {
            if (!this.events[`${child.key}/${optionName}`]) {
                const options = child.data.on[optionName];
                this.events[`${child.key}/${optionName}`] = this.getFn(child.sel, `${child.key}/${optionName}`, options);
            }
            child.data.on[optionName] = (x) => {
                const files = [];
                if (x.target?.files) {
                    for (const file of x.target.files) {
                        files.push({
                            file: file,
                            fileName: file.name
                        });
                    }
                }

                this.events[`${child.key}/${optionName}`](x, mapEvent(x), files);
            };
        }
        return h(
            child.sel,
            child.data,
            child.children.map(x => {
                return x.sel ? this.traverseTree(x) : x.text
            })
        );
    }

    once = false;
    updateId = 0;
    browserCommandDebouncedCallbacks = {};

    async connectedCallback() {
        const connectionGeneration = ++this.connectionGeneration;
        while ((!window['draymanConfig'] || !this.component) && connectionGeneration === this.connectionGeneration) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (connectionGeneration !== this.connectionGeneration || !this.isConnected) {
            return;
        }
        this.updateId = 0;
        let initSettled = false;
        let connectionLostOverlay: HTMLDivElement;
        const connection = window['draymanConfig'].connection;
        const markInitSuccess = () => {
            if (initSettled) {
                return;
            }
            initSettled = true;
            this.onInit?.();
        };
        const markInitFailed = () => {
            if (initSettled) {
                return;
            }
            initSettled = true;
            this.onInitFailed?.();
        };
        const connectionClose = () => {
            if (!connectionLostOverlay) {
                connectionLostOverlay = document.createElement('div');
                connectionLostOverlay.style.position = 'absolute';
                connectionLostOverlay.style.top = '0';
                connectionLostOverlay.style.left = '0';
                connectionLostOverlay.style.width = '100%';
                connectionLostOverlay.style.height = '100%';
                connectionLostOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                connectionLostOverlay.style.display = 'flex';
                connectionLostOverlay.style.justifyContent = 'center';
                connectionLostOverlay.style.alignItems = 'center';
                connectionLostOverlay.style.zIndex = '1000';
                let message = document.createElement('div');
                message.textContent = 'Component connection lost';
                connectionLostOverlay.appendChild(message);
                this.style.position = 'relative';
                this.appendChild(connectionLostOverlay);
                connectionLostOverlay.style.pointerEvents = 'none';
            }
            markInitFailed();
        };
        connection.onConnectionClose(connectionClose);
        const browserCommands = window['draymanConfig'].browserCommands?.(
            (callbackId, data, options) => {
                if (!options?.debounce) {
                    return connection.handleBrowserCallback({ callbackId, data, });
                }
                if (!this.browserCommandDebouncedCallbacks[callbackId]) {
                    this.browserCommandDebouncedCallbacks[callbackId] = this.eventDebounce((callbackId, data) => connection.handleBrowserCallback({ callbackId, data, }), options.debounce);
                }

                return this.browserCommandDebouncedCallbacks[callbackId](callbackId, data);
            }
        ) || {};
        let rootNode = document.createElement('drayman-element-container') as any;
        let serializedTree: any[] | undefined;
        let viewStreamFailed = false;
        const failViewStream = (error) => {
            if (viewStreamFailed) {
                return;
            }
            viewStreamFailed = true;
            console.error(`Failed to apply view update for component ${this.component}`, error);
            window.location.reload();
        };
        this.appendChild(rootNode);
        let componentInstanceId = '';
        try {
            componentInstanceId = await connection.initializeComponent({
                componentId: this.component,
                componentOptions: this.options,
                browserCommands: Object.keys(browserCommands),
            });
        } catch (error) {
            markInitFailed();
            throw error;
        }
        if (connectionGeneration !== this.connectionGeneration || !this.isConnected) {
            this.destroyComponentInstance(componentInstanceId);
            return;
        }
        this.componentInstanceId = componentInstanceId;
        connection.onEvent(componentInstanceId, async ({ type, payload }) => {
            if (connectionGeneration !== this.connectionGeneration || this.componentInstanceId !== componentInstanceId) {
                return;
            }
            if (type === 'view') {
                if (viewStreamFailed) {
                    return;
                }
                if (!payload || !Number.isSafeInteger(payload.updateId) || payload.updateId < 1) {
                    failViewStream(new Error('View update has an invalid updateId'));
                    return;
                }
                if (payload.updateId <= this.updateId) {
                    return;
                }
                try {
                    let nextTree: any[];
                    const hasView = Object.prototype.hasOwnProperty.call(payload, 'view');
                    const hasPatch = Object.prototype.hasOwnProperty.call(payload, 'patch');
                    if (hasView === hasPatch) {
                        throw new Error('View update must contain exactly one snapshot or patch');
                    }
                    if (Array.isArray(payload.view)) {
                        nextTree = payload.view;
                    } else if (Array.isArray(payload.patch)) {
                        if (serializedTree === undefined || payload.baseUpdateId !== this.updateId) {
                            throw new Error(`View patch baseline mismatch (expected ${this.updateId}, received ${payload.baseUpdateId})`);
                        }
                        nextTree = applyPatch(serializedTree, payload.patch, true, true, true).newDocument;
                    } else {
                        throw new Error('View update does not contain a snapshot or patch');
                    }
                    if (!Array.isArray(nextTree)) {
                        throw new Error('View update did not produce a tree');
                    }
                    const renderTree = JSON.parse(JSON.stringify(nextTree));
                    const newNode = h('drayman-element-container', { attrs: { componentInstanceId } }, renderTree.map(x => this.traverseTree(x)));
                    patch(rootNode, newNode);
                    rootNode = newNode;
                    serializedTree = nextTree;
                    this.updateId = payload.updateId;
                } catch (error) {
                    failViewStream(error);
                    return;
                }
                markInitSuccess();
            } else if (type === 'browserCommand') {
                const { data, callbackId, command, elements } = payload;
                let domElements: Element[] = [];
                if (elements) {
                    for (const x of elements) {
                        let ref = x;
                        let wait = false;
                        let customSelector;
                        if (typeof x === 'object') {
                            ref = x.ref;
                            wait = x.wait;
                            customSelector = x.customSelector;
                        }
                        if (wait) {
                            await waitForElement(componentInstanceId, ref, customSelector);
                        }
                        domElements.push(getElement(componentInstanceId, ref, customSelector));
                    }
                }
                const response = await browserCommands[command](data, domElements);
                connection.handleBrowserCallback({ callbackId, data: response });
            } else if (type === 'rootEvent') {
                await this.rootEvents[payload.event](payload.data);
            } else if (type === 'componentInstanceDestroyed') {
                connectionClose();
            }
        });
    }

    disconnectedCallback() {
        this.connectionGeneration++;
        if (this.updateId) {
            this.onDestroy?.();
        }
        this.destroyComponentInstance();
    }
});

export const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on';

const getElement = (componentInstanceId, ref, customSelector) => document.querySelector(customSelector ? customSelector : `drayman-element-container[componentinstanceid="${componentInstanceId}"] [ref="${ref}"]`);
const waitForElement = (componentInstanceId, ref, customSelector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const intervalDuration = 100;
        let elapsedTime = 0;
        const intervalId = setInterval(() => {
            const element = getElement(componentInstanceId, ref, customSelector);
            if (element) {
                clearInterval(intervalId);
                resolve(element);
            } else if (elapsedTime >= timeout) {
                clearInterval(intervalId);
                reject(new Error(`Element with ref "${ref}" not found within ${timeout} ms`));
            }
            elapsedTime += intervalDuration;
        }, intervalDuration);
    });
};
