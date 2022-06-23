import { svgElementAttributes, htmlElementAttributes } from 'all-html-attributes';

export const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on';
// export const isEvent = (optionName: string) => optionName?.length > 2 && optionName.slice(0, 2) === 'on' && optionName[2] === optionName[2].toUpperCase();

async function parseFnType(item) {
    if (typeof item?.type === 'function') {
        const rendered = await item.type(item.props);
        return parseFnType(rendered);
    }
    return item;
}

export const render = async (raw, childRenderer = null, renderedArr = [], events = {}, parent = '') => {
    async function traverse(arr: { type: string | any; props: any; key: string; }[], renderedArr = [], parent = null) {
        for (let item of (Array.isArray(arr) ? arr : [arr])) {
            // console.log(1, item)
            if (item?.type === '$$fragment') {
                await traverse(item.props?.children, renderedArr, parent);
            } else if (item?.type) {
                // if (typeof item.type === 'function') {
                //     const rendered = await item.type(item.props);
                //     item = { ...rendered };
                // }
                item = { ...await parseFnType(item) }
                const result = await childRenderer?.(item.type, item.key ? `${parent}/${item.key}/${item.type}` : `${parent}/${renderedArr.length}/${item.type}`, item.props);
                if (result) {
                    await render(result, childRenderer, renderedArr, events, `${parent}`);
                } else {
                    const type = (item.type === 'container' || item.type === 'html') ? 'div' : item.type;
                    const { children, style, ...options } = item.props || {};
                    // const options = rest || {};
                    const itemName = `${parent}/${renderedArr.length}/${type}`;
                    const on = {};
                    const props = {};
                    const attrs = {};
                    for (const optionKey of Object.keys(options)) {
                        if (isEvent(optionKey)) {
                            // const eventId = Object.keys(events).length;
                            let eventOptions;
                            let eventFn;
                            if (typeof options[optionKey] === 'function') {
                                eventFn = options[optionKey];
                                eventOptions = true;
                            } else {
                                [eventFn, eventOptions] = options[optionKey];
                            }
                            if ((type as string).includes('-')) {
                                events[`${itemName}/${optionKey}`] = eventFn;
                                props[optionKey] = eventOptions;
                            } else {
                                const eventName = optionKey.slice(2).toLowerCase();
                                events[`${itemName}/${eventName}`] = eventFn;
                                on[eventName] = eventOptions;
                                // delete options[optionKey];
                            }
                            // options[optionKey] = true;
                        } else if (optionKey === 'ref' || (svgElementAttributes[type] && (svgElementAttributes[type].includes(optionKey) || svgElementAttributes['*'].includes(optionKey)))) {
                            attrs[optionKey] = options[optionKey];
                        } else {
                            if (htmlElementAttributes[type] && (htmlElementAttributes[type].includes(optionKey) || htmlElementAttributes['*'].includes(optionKey))) {
                                attrs[optionKey] = options[optionKey];
                            }
                            props[optionKey] = options[optionKey];
                        }
                    }
                    const newItem: any = {
                        // key: itemName,
                        children: [],
                        sel: type,
                        key: itemName,
                        data: {},
                        // data: { props: options },
                        //text: undefined,
                        // options: options,
                        // style: formatStyle(style) || null,
                        // type,
                        // children: [],
                        // key: itemName,
                    };
                    if (style && Object.keys(style).length) {
                        newItem.data.style = formatStyle(style);
                    }
                    if (Object.keys(props).length) {
                        newItem.data.props = props;
                    }
                    if (Object.keys(attrs).length) {
                        newItem.data.attrs = attrs;
                    }
                    if (Object.keys(on).length) {
                        newItem.data.on = on;
                    }
                    if (options.is) {
                        newItem.data.is = options.is;
                    }
                    renderedArr.push(newItem);
                    // if (parentEl?.sel === 'select') {
                    //     if (parentEl.data.props.multiple && parentEl.data.props.value.includes(newItem.data.props.value)) {
                    //         newItem.data.props.selected = true;
                    //     } else if (parentEl.data.props.value === newItem.data.props.value) {
                    //         newItem.data.props.selected = true;
                    //     }
                    // }
                    // if (typeof item.props.children === 'string' || typeof item.props.children === 'number') {
                    //     newItem.text = item.props.children;
                    // } else {
                    await traverse(children, newItem.children, itemName);
                    // if (newItem.sel === 'select' && newItem.data.props?.value) {
                    //     delete newItem.data.props.value;
                    // }
                    // if (newItem.sel === 'input' && newItem.data.props?.type === 'checkbox') {
                    //     newItem.data.props.checked = !!newItem.data.props.value;
                    //     delete newItem.data.props.value;
                    // }
                    // if (newItem.sel === 'input' && newItem.data.props?.type === 'radio') {
                    //     newItem.data.props.checked = !!newItem.data.props.value;
                    //     // delete newItem.data.props.value;
                    // }
                    // if (newItem.sel === 'input' && newItem.data.props?.value) {
                    //     newItem.data.attrs = { value: newItem.data.props.value }
                    //     delete newItem.data.props.value;
                    // }
                    // }
                }
            } else if (Array.isArray(item)) {
                await traverse(item, renderedArr, `${parent}`);
            } else if (item && typeof item === 'string' || typeof item === 'number') {
                // parentEl.text = parentEl.text ? parentEl.text + item : item;
                const lastItem = renderedArr[renderedArr.length - 1];
                if (lastItem && !lastItem.sel) {
                    lastItem.text += item;
                } else {
                    renderedArr.push({
                        children: [],
                        text: item,
                        // sel: type,
                        key: `${parent}/${renderedArr.length}/text`,
                        // data: { props: options },
                        //text: undefined,
                        // options: options,
                        // style: formatStyle(style) || null,
                        // type,
                        // children: [],
                        // key: itemName,
                    })
                }
                // console.log(item)
                // const lastArrItem = renderedArr[renderedArr.length - 1];
                // console.log({ item })
                // console.log({ lastArrItem, item })
                // lastArrItem.text += item;
                // if (lastArrItem?.type === 'text') {
                //     lastArrItem.text += item;
                // } else {
                //     renderedArr.push({
                //         options: { text: item },
                //         // style: null,
                //         // type: 'text',
                //         children: [],
                //         key: `${parent}/${renderedArr.length}/text`,
                //     });
                // }
            }
            // if (item?.props?.children) {
            //     await traverse(item.props.children, renderedArr);
            // }
        }
    }
    await traverse(raw, renderedArr, parent);

    return { tree: renderedArr, events };
}

const formatStyle = (style) => {
    if (!style) {
        return null;
    }
    const newStyle = {};
    for (const prop of Object.keys(style || {})) {
        if (typeof style[prop] === 'number' && !isUnitlessNumber[prop]) {
            style[prop] = `${style[prop]}px`;
        }
        newStyle[prop] = style[prop];
    }
    return newStyle;
}

const isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
};

const toKebabCase = (string) => {
    return string.replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2').toLowerCase();
}