import * as _CSS from 'csstype';

interface DefaultProps {
    /**
     * Inline style for an element.
     */
    style?: CSS;
    /**
     * The tabindex global attribute indicates that its element can be focused, and where it participates in sequential keyboard navigation.
     */
    tabindex?: number;
    /**
     * This attribute sets up a callback function that will be called whenever user presses specific key or key combination.
     *  
     * To set up shortcut, provide required key combination to `onShortcut` attribute after colon symbol: `onShortcut:enter`, `onShortcut:ctrl+i`.
     *  
     * Make sure that an element is focusable, otherwise `onShortcut` won't work.
     *  
     * Because JSX syntax doesn’t allow special characters in attribute names (like : or +), you need to use spread attributes technique to set up onShortcut:
     *  
     * Don’t:
     * `<div onShortcut:ctrl+i={handleShortcut}></div>`
     *  
     * Do:
     * `<div {...{ 'onShortcut:ctrl+i': handleShortcut }}></div>`
     */
    onShortcut?: any;
}

interface PropsWithChildren extends DefaultProps {
    children?: JSX.Element;
}

interface DefaultInputProps extends PropsWithChildren {
    onValueChangeStart?: () => Promise<void>;
    updateOnBlur?: boolean;
    disabled?: boolean;
}

interface TextInputProps extends DefaultInputProps {
    type?: 'text';
    value?: string;
    onValueChange?: (data: { value: string }) => Promise<void>;
}

interface NumberInputProps extends DefaultInputProps {
    type?: 'number';
    value?: number;
    onValueChange?: (data: { value: number }) => Promise<void>;
}

declare global {
    interface TableDataCellProps extends PropsWithChildren {
        /**
         * This attribute contains a non-negative integer value that indicates for how many columns the cell extends.
         */
        colspan?: number;
        /**
         * This attribute contains a non-negative integer value that indicates for how many rows the cell extends.
         */
        rowspan?: number;
    }
    // interface TableHeaderCellProps extends PropsWithChildren {

    // }
    interface DivProps extends PropsWithChildren { }
    interface PreformattedProps extends PropsWithChildren { }
    interface HeadingProps extends PropsWithChildren { }
    type InputProps = TextInputProps | NumberInputProps;
    interface ImageProps extends DefaultProps {
        /**
         * Path to the image you want to embed.
         */
        src?: string;
        /**
         * Holds a text description of the image.
         */
        alt?: string;
    }
    interface ButtonProps extends PropsWithChildren {
        /**
         * Specifies `async` action to run when element is clicked.
         */
        onClick?: () => Promise<void>;
        /**
         * Prevents user from interacting with the button. Can be `true` or `false`.
         */
        disabled?: boolean;
    }
    interface SpanProps extends PropsWithChildren { }
    interface TableProps extends PropsWithChildren { }
    interface TableBodyProps extends PropsWithChildren { }
    interface TableHeadProps extends PropsWithChildren { }
    interface TableFootProps extends PropsWithChildren { }
    interface TableRowProps extends PropsWithChildren { }
    interface TableHeaderCellProps extends PropsWithChildren { }

    namespace JSX {
        interface IntrinsicElements {
            /**
             * Heading level 1.
             */
            'h1': HeadingProps;
            /**
             * Heading level 2.
             */
            'h2': HeadingProps;
            /**
             * Heading level 3.
             */
            'h3': HeadingProps;
            /**
             * Heading level 4.
             */
            'h4': HeadingProps;
            /**
             * Heading level 5.
             */
            'h5': HeadingProps;
            /**
             * Heading level 6.
             */
            'h6': HeadingProps;
            /**
             * Defines a cell of a table.
             */
            'td': TableDataCellProps;
            /**
             * Generic container for flow content.
             */
            'div': DivProps;
            /**
             * Generic inline container for phrasing content, which does not inherently represent anything.
             */
            'span': SpanProps;
            /**
             * Represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.
             */
            'table': TableProps;
            'tbody': TableBodyProps;
            'thead': TableHeadProps;
            'tfoot': TableFootProps;
            'tr': TableRowProps;
            'th': TableHeaderCellProps;
            /**
             * Used to create interactive controls in order to accept data from the user.
             */
            'input': InputProps;
            /**
             * Embeds an image into the document.
             */
            'img': ImageProps;
            /**
             * Clickable button used to perform server-side actions.
             */
            'button': ButtonProps;
            /**
             * Represents preformatted text which is to be presented exactly as written in the HTML file.
             */
            'pre': PreformattedProps;
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
            UI: {
                /**
                 * Opens a modal window with specific component instance.
                 * @param componentId ID of the component to open.
                 * @param options Options object passed to component.
                 * @param onClose Callback function that will be executed on modal close.
                 */
                openModal: (componentId: string, options?: any, onClose?: (data: any) => Promise<void>) => Promise<void>;
                /**
                 * Can be used only in modal component.
                 * Closes it and emits a `data` if needed.
                 * @param data Any data passed to `onClose` event.
                 */
                closeModal(data?: any): any;
                openWindow(url?: string, target?: string, features?: string, replace?: boolean): Promise<any>;
                /**
                 * Copies provided value to clipboard.
                 * @param value Value to copy.
                 */
                copyToClipboard(value: string): any;
                /**
                 * Shows a brief message at the bottom of the screen.
                 * @param message Message to show.
                 * @param options Options.
                 * @param onClose Callback function that will be executed on close. Has `dismissedByAction` boolean.
                 */
                openSnackBar(message: string, options?: {
                    /**
                     * The label for the snack bar action.
                     */
                    action?: string;
                    /**
                     * The length of time in milliseconds to wait before automatically dismissing the snack bar.
                     */
                    duration?: number;
                    /**
                     * The horizontal position to place the snack bar.
                     */
                    horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
                    /**
                     * The vertical position to place the snack bar.
                     */
                    verticalPosition?: 'top' | 'bottom';
                }, onClose?: (data: {
                    dismissedByAction: boolean;
                }) => Promise<void>): any;
            };
            Router: {
                url: string;
                navigate(path: string): any;
                onRouteChange: ({ previousUrl: string }: {
                    previousUrl: any;
                }) => Promise<any>;
            };
        } & DataExtend): any;
    }
}

export { };
