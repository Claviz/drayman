import {
    init,
    // classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
    attributesModule,
    vnode,
} from "snabbdom";
// const someFn = () => console.log(123);
// const anotherEventHandler = () => console.log(456);
// import { applyPatch } from 'fast-json-patch';

const patch = init([
    // Init patch function with chosen modules
    // classModule, // makes it easy to toggle classes
    attributesModule,
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule // attaches event listeners
]);


// function debounce(fn, startFn, wait = 1) {
//     let timeout;
//     let started = false;
//     return function (...args) {
//         // console.log({ timeout })
//         if (!started) {
//             started = true;
//             if (startFn) {
//                 startFn();
//             }
//         }
//         clearTimeout(timeout)
//         timeout = setTimeout(() => { fn.call(this, ...args); started = false; }, wait)
//     }
// }

function debounce(func, wait, options) {
    let timeout;
    return function () {
        console.log({ arguments })
        let context = this,
            args = arguments,
            later,
            callNow;
        later = function () {
            timeout = null;
            if (options.trailing) {
                func.apply(context, [{ trailing: true, }, ...args]);
            }
        };
        callNow = options.leading && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, [{ leading: true, }, ...args]);
        }
    };
}

// const onInput = (props, event) => {
// }

// const onSelect = (props, event) => {
//     const selected = [...event.target.options].filter(x => x.selected).map(x => x.value);
//     return { selected: props?.multiple ? selected : selected[0] };
// };

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

// const mapping = {
//     'input': {
//         'change': onInput,
//         'input': onInput,
//     },
//     'select': {
//         'change': onSelect,
//         'input': onSelect,
//     },
// }


// function getProp(object, keys) {
//     keys = Array.isArray(keys) ? keys : keys.split('.');
//     object = object[keys[0]];
//     if (object && keys.length > 1) {
//         return getProp(object, keys.slice(1));
//     }
//     console.log({ object })
//     return object;
// }

customElements.define('drayman-element', class extends HTMLElement {
    config: any;
    // component: string;
    componentInstanceId: string;
    previouslySerializedTree = [];
    events = {};
    // _options: any;

    get options() {
        return this.getAttribute('options');
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
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

    // set options(options) {
    //     console.log(`setting options!`, options)
    //     this._options = options;
    // }
    // get options() {
    //     return this._options;
    // }

    static get observedAttributes() {
        return ['options'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('ATTRIB CHANGE!', attrName, oldValue, newValue);
        if (attrName === 'options' && this.config) {
            this.config.connection.updateComponentInstanceProps({ componentInstanceId: this.componentInstanceId, options: this.options });
        }
        // if (attrName )
        // this[attrName] = newValue;
        // if (newValue !== oldValue) {
        //     this[attrName] = this.hasAttribute(attrName);
        // }
    }

    getFn(eventName, eventOptions) {
        // const optionMapper = (options) => {
        //     let get = eventOptions?.get || {};
        //     const obj = {};
        //     for (let key of Object.keys(get)) {
        //         obj[key] = getProp(options, get[key]);
        //     }
        //     return obj;
        // }
        if (this.config.eventOptions) {
            eventOptions = { ...this.config.eventOptions, ...(eventOptions || {}) };
        }
        if (typeof eventOptions === 'object') {
            if (eventOptions.debounce) {
                let wait = typeof eventOptions.debounce === 'number' ? eventOptions.debounce : eventOptions.debounce.wait;
                let trailing = typeof eventOptions.debounce === 'number' ? true : !!eventOptions.debounce?.trailing;
                let leading = !!eventOptions.debounce?.leading;
                return debounce(this.emit.bind(this, eventName), wait, { trailing, leading });
            }
        }
        // return this.emit(eventName, eventOptions);
        return this.emit.bind(this, eventName, null);
    }

    emit = async (eventName: string, info = {}, options = {}, files: any[] = []) => {
        console.log({ eventName, options, files, info })
        const formData = new FormData();
        formData.append('eventName', eventName);
        formData.append('componentInstanceId', this.componentInstanceId);
        formData.append('options', JSON.stringify({ ...info, ...options }));
        for (let file of files) {
            formData.append('file', file.file, file.fileName);
        }
        return await this.config?.connection.postFormData(formData);
    }

    traverseTree(child: { sel: any; data: any; children: any; text: any; key: string; }): any {
        if (child.sel?.includes('-')) {
            // const options = {};
            for (const option of Object.keys(child.data.props || {})) {
                if (isEvent(option)) {
                    if (!this.events[`${child.key}/${option}`]) {
                        // const fn = this.emit.bind(this, `${child.data._key}/${option}`);
                        // const fn = (x) => this.emit(`${child.data._key}/${option}`, x);
                        this.events[`${child.key}/${option}`] = this.getFn(`${child.key}/${option}`, child.data.props[option]);
                    }
                    child.data.props[option] = this.events[`${child.key}/${option}`];
                    // delete child.data.props[option];
                }
            }
            const scriptId = `elements/${child.sel}`;
            if (!document.getElementById(scriptId)) {
                console.log(child.sel)
                const my_awesome_script = document.createElement('script');
                my_awesome_script.setAttribute('id', scriptId);
                my_awesome_script.setAttribute('src', `/api/elementScript/${child.sel}`);
                document.head.appendChild(my_awesome_script);
            }
            // child.data.props.options = options;
            return h(
                child.sel,
                child.data,
                child.children.map(x => x.sel ? this.traverseTree(x) : x.text)
                // child.type,
                // { style: child.style, props: { options: child.options } },
            );
        }
        for (const optionName of Object.keys(child.data?.on || {})) {
            // mozhno izna4alno ne emititj iz core
            // if (!optionName.endsWith('start')) {
            if (!this.events[`${child.key}/${optionName}`]) {
                // events[`${child.data._key}/${optionName}start`] = () => {
                //     this.emit(`${child.data._key}/${optionName}start`);
                // }

                const options = child.data.on[optionName];
                // const fn = (x) => {
                //     // x.preventDefault();
                //     // console.log(x)
                //     // let data: any = {};
                // if (!options.get) {
                //     if (['input', 'textarea'].includes(child.sel)) {
                //         options.get = { value: child.data.props.type === 'checkbox' ? 'target.checked' : 'target.value' }
                //         // data.value = child.data.props.type === 'checkbox' ? x.target.checked : x.target.value;
                //     } else if (child.sel === 'select') {
                //         const selected = [...x.target.options].filter(x => x.selected).map(x => x.value);
                //         data.value = child.data.props.multiple ? selected : selected[0];
                //     } else {
                //         data = x;
                //     }
                // }
                //     this.emit(`${child.data._key}/${optionName}`, x);
                // };
                this.events[`${child.key}/${optionName}`] = this.getFn(`${child.key}/${optionName}`, options);
                // }, events[`${child.data._key}/${optionName}start`], 500);
            }
            child.data.on[optionName] = (x) => {
                // x.preventDefault();
                console.log(x, x.target?.files);
                const files = [];
                if (x.target?.files) {
                    for (const file of x.target.files) {
                        files.push({
                            file: file,
                            fileName: file.name
                        });
                    }
                }

                this.events[`${child.key}/${optionName}`](mapEvent(x), files);
            };
            // }
        }
        return h(
            child.sel,
            child.data,
            // { attrs: child.data.props },
            // child.data,
            child.children.map(x => {
                return x.sel ? this.traverseTree(x) : x.text
            })
            // child.text || this.traverseTree(child.children),
            // child.type,
            // { style: child.style, attrs, props, on },
            // child.children.map(x => {
            //     if (x.type === 'text') {
            //         return x.options.text;
            //     }
            //     return this.traverseTree(x);
            // })
        );
        // return h('span', { style: { fontWeight: "bold" } }, `Hello, world!`);
    }

    once = false;
    async connectedCallback() {
        document.addEventListener('draymanInit', async (e: CustomEvent) => {
            console.log('initing. config exists?', !!this.config)
            if (this.config) {
                return;
            }
            this.config = e.detail.config;
            let rootNode = document.createElement('drayman-element-container') as any;
            this.appendChild(rootNode);
            // while (!this.config) {
            //     console.log(`waiting for config`);
            //     await new Promise(resolve => setTimeout(resolve, 100));
            // }
            console.log(`config received`, this.config, this.component);
            // const script = await fetch(`/api/elementScript/drayman-button`);
            // console.log(script);
            // console.log('attrib get', this.getAttribute('options'))
            this.componentInstanceId = await this.config.connection.initializeComponent({
                componentId: this.component,
                componentOptions: this.options,
                browserCommands: Object.keys(this.config.browserCommands || {}),
            });
            console.log(`INITED!!!`)
            this.config.connection.onEvent(this.componentInstanceId, async ({ type, payload }) => {
                console.log(`onevent`, this.componentInstanceId)
                if (type === 'view') {
                    // applyPatch(this.previouslySerializedTree, (payload.view || []));
                    // const tree = JSON.parse(JSON.stringify(this.previouslySerializedTree));
                    // console.log(this.previouslySerializedTree);
                    const newNode = h('drayman-element-container', {}, payload.view.map(x => this.traverseTree(x)));
                    // this.viewTree = tree;
                    patch(rootNode, newNode);
                    rootNode = newNode;
                    console.log(rootNode)
                    // this.childNodes[0].replaceWith(...this.childNodes[0].childNodes);
                    // const node = document.getElementsByClassName('.rofl')[0];
                    // console.log({ node })
                    // if (!this.once) {
                    //     this.childNodes[0].replaceWith(...this.childNodes[0].childNodes);
                    //     this.once = true;
                    // }
                } else if (type === 'browserCommand') {
                    const { data, callbackId, command } = payload;
                    // snackbar.afterDismissed().subscribe((data) => {
                    const response = await this.config.browserCommands[command](data);
                    this.config?.connection.handleBrowserCallback({ callbackId, data: response });
                    // })
                }
            });
        });
        // let i = 0;
        // setInterval(() => {
        //     console.log(this.getAttribute('component'), this.getAttribute('options'))
        //     const vnode2 = h("div", { attrs: { class: `red black ${i}` }, on: { click: someFn } }, [
        //         h("span", { style: { fontWeight: "bold" } }, `This is bold ${i}`),
        //         " and this is just normal text",
        //         h("a", { props: { href: "/foo" } }, "I'll take you places!!!"),
        //         h("div", {}, "Ready!"),
        //     ]);
        //     console.log(rootNode, vnode2)
        //     patch(rootNode, vnode2);
        //     rootNode = vnode2;
        //     i++;
        // }, 1000)
    }

    disconnectedCallback() {
        this.config.connection?.destroyComponentInstance({ componentInstanceId: this.componentInstanceId });
    }
});

// const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on' && optionName[2] === optionName[2].toUpperCase();
export const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on';



// const newVnode = h(
//     "div#container.two.classes",
//     { on: { click: anotherEventHandler } },
//     [
//         h(
//             "span",
//             { style: { fontWeight: "normal", fontStyle: "italic" } },
//             "This is now italic type"
//         ),
//         " and this is still just normal text",
//         h("a", { props: { href: "/bar" } }, "I'll take you places!!!!!")
//     ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
