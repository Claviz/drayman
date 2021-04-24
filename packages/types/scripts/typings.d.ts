declare interface DraymanComponent<Props = void, EventHubExtend = void, DataExtend = void> {
    (
        data: {
            props: Props,
            forceUpdate: () => Promise<void>,
            EventHub: {
                on(eventName: string, event: ((payload: any) => any), groupId?: string): any;
                emit(eventName: string, data: any, groupId?: string): any;
            } & EventHubExtend,
            UI: {
                /**
                 * Opens a modal window with specific component instance.
                 * @param componentId ID of the component to open.
                 * @param options Options object passed to component.
                 * @param onClose Callback function that will be executed on modal close.
                */
                openModal: (componentId: string, options?: any, onClose?: (data: any) => Promise<void>) => Promise<void>
                /**
                 * Can be used only in modal component.
                 * Closes it and emits a `data` if needed.
                 * @param data Any data passed to `onClose` event.
                 */
                closeModal(data?: any);
                openWindow(url?: string, target?: string, features?: string, replace?: boolean): Promise<any>;
                /**
                 * Copies provided value to clipboard.
                 * @param value Value to copy.
                 */
                copyToClipboard(value: string);
                /**
                 * Shows a brief message at the bottom of the screen.
                 * @param message Message to show.
                 * @param options Options.
                 * @param onClose Callback function that will be executed on close. Has `dismissedByAction` boolean.
                 */
                openSnackBar(
                    message: string,
                    options?: {
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
                    },
                    onClose?: (data: { dismissedByAction: boolean; }) => Promise<void>
                );
            },
            Router: {
                url: string;
                navigate(path: string);
                onRouteChange: ({ previousUrl: string }) => Promise<any>;
            },
        } & DataExtend,
    ): any;
}

declare namespace JSX {
    interface IntrinsicElements {
        // ELEMENTS-START
        // ELEMENTS-END
    }
}
