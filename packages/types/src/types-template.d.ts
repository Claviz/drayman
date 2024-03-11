import * as _CSS from 'csstype';

declare global {
    interface EventGuard {
        mask?: EventOptions;
        preventDefault?: boolean;
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
        eventGuards?: EventGuard[];
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
    type EventFunction<T> = (options: IPropertiesToAdd<T>, files?: UploadedFile[], signal?: AbortSignal) => Promise<void>;
    type ElementEvent<T> = EventFunction<T> | [EventFunction<T>, EventConfig];

    interface DefaultElementEventProps extends DefaultElementProps {
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

    interface DefaultSvgElementEventProps extends DefaultSvgElementProps {
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

    /*** INTRINSIC_ELEMENT_INTERFACES */
    namespace JSX {
        interface IntrinsicElements {
            /*** INTRINSIC_ELEMENTS */

            [key: string]: any;
        }
        interface Element { }
    }

    interface CSS extends _CSS.StandardProperties<number | string>, _CSS.SvgProperties<number | string> {
        [key: string]: any;
    }

    interface BrowserCommandElementRefOptions {
        wait?: boolean;
        ref?: string;
        customSelector?: string;
    }

    interface DraymanComponent<Props = void, EventHubExtend = void, BrowserExtend = void, DataExtend = void, ServerExtend = void> {
        (data: {
            props: Props;
            forceUpdate: () => Promise<void>;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            } & EventHubExtend;
            Browser: {
                [command: string]: (options?: any, elementRefs?: Array<string | BrowserCommandElementRefOptions>) => Promise<any>
            } & BrowserExtend;
            Server: {
                [command: string]: (options?: any) => Promise<any>
            } & ServerExtend;
            ComponentInstance: {
                id: string;
                onDestroy: (() => Promise<void>) | (() => void);
                onInit: (() => Promise<void>) | (() => void);
            }
        } & DataExtend): any;
    }

    interface DraymanServer {
        (data: {
            emit: (callback: any, data?: any) => Promise<void>;
            app: any;
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            }
        }): any;
    }
}

export { };
