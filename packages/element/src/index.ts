import {
    init,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
    attributesModule,
    VNode,
} from 'snabbdom';

function updateProps(oldVnode: VNode, vnode: VNode): void {
    const element = vnode.elm as any;
    let oldProps = oldVnode.data?.props || {};
    let props = vnode.data?.props || {};
    for (const key of (Object.keys(oldProps))) {
        if (props[key] === undefined) {
            props[key] = null;
        }
    }
    if (element instanceof HTMLInputElement && element === document.activeElement) {
        delete vnode?.data?.props?.value;
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
    componentInstanceId: string;
    previouslySerializedTree = [];
    events = {};
    rootEvents = {};
    onInit;
    onDestroy;

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
                        child.data.props = { ...child.data.props, ...(currentElementOption as any) };
                    } else {
                        const props = {};
                        const events = {};
                        for (const option of Object.keys(currentElementOption)) {
                            if (isEvent(option)) {
                                events[option.substring(2)] = currentElementOption[option];
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
    initSent = false;
    browserCommandDebouncedCallbacks = {};

    async connectedCallback() {
        while (!window['draymanConfig'] || !this.component) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const browserCommands = window['draymanConfig'].browserCommands?.(
            (callbackId, data, options) => {
                if (!options?.debounce) {
                    return window['draymanConfig']?.connection.handleBrowserCallback({ callbackId, data, });
                }
                if (!this.browserCommandDebouncedCallbacks[callbackId]) {
                    this.browserCommandDebouncedCallbacks[callbackId] = this.eventDebounce((callbackId, data) => window['draymanConfig']?.connection.handleBrowserCallback({ callbackId, data, }), options.debounce);
                }

                return this.browserCommandDebouncedCallbacks[callbackId](callbackId, data);
            }
        ) || {};
        let rootNode = document.createElement('drayman-element-container') as any;
        this.appendChild(rootNode);
        this.componentInstanceId = await window['draymanConfig'].connection.initializeComponent({
            componentId: this.component,
            componentOptions: this.options,
            browserCommands: Object.keys(browserCommands),
        });
        window['draymanConfig'].connection.onEvent(this.componentInstanceId, async ({ type, payload }) => {
            if (type === 'view' && payload.updateId > this.updateId) {
                this.updateId = payload.updateId;
                const newNode = h('drayman-element-container', { attrs: { componentInstanceId: this.componentInstanceId } }, payload.view.map(x => this.traverseTree(x)));
                patch(rootNode, newNode);
                rootNode = newNode;
                if (!this.initSent) {
                    this.onInit?.();
                    this.initSent = true;
                }
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
                            await waitForElement(this.componentInstanceId, ref, customSelector);
                        }
                        domElements.push(getElement(this.componentInstanceId, ref, customSelector));
                    }
                }
                const response = await browserCommands[command](data, domElements);
                window['draymanConfig']?.connection.handleBrowserCallback({ callbackId, data: response });
            } else if (type === 'rootEvent') {
                await this.rootEvents[payload.event](payload.data);
            }
        });
        window['draymanConfig'].connection.onConnectionClose(() => {
            let overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';
            let message = document.createElement('div');
            message.textContent = 'Component connection lost';
            overlay.appendChild(message);
            this.style.position = 'relative';
            this.appendChild(overlay);
            overlay.style.pointerEvents = 'none';
        });
    }

    disconnectedCallback() {
        if (this.updateId) {
            this.onDestroy?.();
        }
        window['draymanConfig']?.connection?.destroyComponentInstance({ componentInstanceId: this.componentInstanceId });
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