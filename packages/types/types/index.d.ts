import * as _CSS from 'csstype';

declare global {
    interface DefaultProps {
        /**
         * CSS class definition.
         */
        class?: string;
        /**
         * Inline style for an element.
         */
        style?: CSS;
        [key: string]: any;
    }

    interface EventConfig {
        /**
         * Delays invoking event until specified time has elapsed since the last time the debounced function was invoked.
         * You can provide `number` of milliseconds to delay or some advanced options.
         */
        debounce?: number | {
            /**
             * Number of milliseconds to delay.
             */
            wait: number;
            /**
             * Specify invoking on the trailing edge of the timeout.
             */
            trailing?: boolean;
            /**
             * Specify invoking on the leading edge of the timeout.
             */
            leading?: boolean;
        };
    }

    interface MouseEventOptions {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        x: number;
        y: number;
        pageX: number;
        pageY: number;
        screenX: number;
        screenY: number;
        offsetX: number;
        offsetY: number;
    }

    interface KeyboardEventOptions {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        code: string;
        key: string;
        location: number;
        repeat: boolean;
    }

    interface InputEventOptions {
        value: any;
    }

    interface FocusEventOptions { }

    interface UploadedFile {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: Uint8Array;
        size: number;
    }

    type EventOptions = MouseEventOptions | KeyboardEventOptions | InputEventOptions | FocusEventOptions;

    type IPropertiesToAdd<T> = T & {
        trailing: boolean;
        leading: boolean;
    };
    type EventFunction<T> = (options: IPropertiesToAdd<T>, files?: UploadedFile[]) => Promise<void>;
    type ElementEvent<T> = EventFunction<T> | [EventFunction<T>, EventConfig];

    interface DefaultElementProps {
        onclick?: ElementEvent<MouseEventOptions>;
        oncontextmenu?: ElementEvent<MouseEventOptions>;
        ondblclick?: ElementEvent<MouseEventOptions>;
        onmousedown?: ElementEvent<MouseEventOptions>;
        onmouseenter?: ElementEvent<MouseEventOptions>;
        onmouseleave?: ElementEvent<MouseEventOptions>;
        onmousemove?: ElementEvent<MouseEventOptions>;
        onmouseout?: ElementEvent<MouseEventOptions>;
        onmouseover?: ElementEvent<MouseEventOptions>;
        onmouseup?: ElementEvent<MouseEventOptions>;

        onkeydown?: ElementEvent<KeyboardEventOptions>;
        onkeypress?: ElementEvent<KeyboardEventOptions>;
        onkeyup?: ElementEvent<KeyboardEventOptions>;

        oninput?: ElementEvent<InputEventOptions>;
        onchange?: ElementEvent<InputEventOptions>;

        onblur?: ElementEvent<FocusEventOptions>;
        onfocus?: ElementEvent<FocusEventOptions>;
        onfocusin?: ElementEvent<FocusEventOptions>;
        onfocusout?: ElementEvent<FocusEventOptions>;

        [key: string]: any;
    }

    namespace JSX {
        interface IntrinsicElements {
            a: DefaultElementProps;
            abbr: DefaultElementProps;
            address: DefaultElementProps;
            area: DefaultElementProps;
            article: DefaultElementProps;
            aside: DefaultElementProps;
            audio: DefaultElementProps;
            b: DefaultElementProps;
            base: DefaultElementProps;
            bdi: DefaultElementProps;
            bdo: DefaultElementProps;
            big: DefaultElementProps;
            blockquote: DefaultElementProps;
            body: DefaultElementProps;
            br: DefaultElementProps;
            button: DefaultElementProps;
            canvas: DefaultElementProps;
            caption: DefaultElementProps;
            cite: DefaultElementProps;
            code: DefaultElementProps;
            col: DefaultElementProps;
            colgroup: DefaultElementProps;
            data: DefaultElementProps;
            datalist: DefaultElementProps;
            dd: DefaultElementProps;
            del: DefaultElementProps;
            details: DefaultElementProps;
            dfn: DefaultElementProps;
            dialog: DefaultElementProps;
            div: DefaultElementProps;
            dl: DefaultElementProps;
            dt: DefaultElementProps;
            em: DefaultElementProps;
            embed: DefaultElementProps;
            fieldset: DefaultElementProps;
            figcaption: DefaultElementProps;
            figure: DefaultElementProps;
            footer: DefaultElementProps;
            form: DefaultElementProps;
            h1: DefaultElementProps;
            h2: DefaultElementProps;
            h3: DefaultElementProps;
            h4: DefaultElementProps;
            h5: DefaultElementProps;
            h6: DefaultElementProps;
            head: DefaultElementProps;
            header: DefaultElementProps;
            hr: DefaultElementProps;
            html: DefaultElementProps;
            i: DefaultElementProps;
            iframe: DefaultElementProps;
            img: DefaultElementProps;
            input: DefaultElementProps;
            ins: DefaultElementProps;
            kbd: DefaultElementProps;
            keygen: DefaultElementProps;
            label: DefaultElementProps;
            legend: DefaultElementProps;
            li: DefaultElementProps;
            link: DefaultElementProps;
            main: DefaultElementProps;
            map: DefaultElementProps;
            mark: DefaultElementProps;
            menu: DefaultElementProps;
            menuitem: DefaultElementProps;
            meta: DefaultElementProps;
            meter: DefaultElementProps;
            nav: DefaultElementProps;
            noscript: DefaultElementProps;
            object: DefaultElementProps;
            ol: DefaultElementProps;
            optgroup: DefaultElementProps;
            option: DefaultElementProps;
            output: DefaultElementProps;
            p: DefaultElementProps;
            param: DefaultElementProps;
            picture: DefaultElementProps;
            pre: DefaultElementProps;
            progress: DefaultElementProps;
            q: DefaultElementProps;
            rp: DefaultElementProps;
            rt: DefaultElementProps;
            ruby: DefaultElementProps;
            s: DefaultElementProps;
            samp: DefaultElementProps;
            script: DefaultElementProps;
            section: DefaultElementProps;
            select: DefaultElementProps;
            small: DefaultElementProps;
            source: DefaultElementProps;
            span: DefaultElementProps;
            strong: DefaultElementProps;
            style: DefaultElementProps;
            sub: DefaultElementProps;
            summary: DefaultElementProps;
            sup: DefaultElementProps;
            table: DefaultElementProps;
            tbody: DefaultElementProps;
            td: DefaultElementProps;
            textarea: DefaultElementProps;
            tfoot: DefaultElementProps;
            th: DefaultElementProps;
            thead: DefaultElementProps;
            time: DefaultElementProps;
            title: DefaultElementProps;
            tr: DefaultElementProps;
            track: DefaultElementProps;
            u: DefaultElementProps;
            ul: DefaultElementProps;
            'var': DefaultElementProps;
            video: DefaultElementProps;
            wbr: DefaultElementProps;

            svg: DefaultElementProps;
            animate: DefaultElementProps;
            circle: DefaultElementProps;
            defs: DefaultElementProps;
            ellipse: DefaultElementProps;
            g: DefaultElementProps;
            image: DefaultElementProps;
            line: DefaultElementProps;
            linearGradient: DefaultElementProps;
            mask: DefaultElementProps;
            path: DefaultElementProps;
            pattern: DefaultElementProps;
            polygon: DefaultElementProps;
            polyline: DefaultElementProps;
            radialGradient: DefaultElementProps;
            rect: DefaultElementProps;
            stop: DefaultElementProps;
            symbol: DefaultElementProps;
            text: DefaultElementProps;
            tspan: DefaultElementProps;
            use: DefaultElementProps;

            [key: string]: DefaultProps;
        }
        interface Element { }
    }

    interface CSS extends _CSS.StandardProperties<number | string>, _CSS.SvgProperties<number | string> { }

    interface DraymanComponent<Props = void, EventHubExtend = void, DataExtend = void> {
        (data: {
            props: Props;
            forceUpdate: () => Promise<void>;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            } & EventHubExtend;
            Browser: {
                [command: string]: (options?: any) => Promise<any>
            }
        } & DataExtend): any;
    }
}

export { };
