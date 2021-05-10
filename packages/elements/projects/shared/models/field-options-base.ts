export interface FieldOptionsBase<T> {
    /**
     * Value of the input.
     */
    value?: T;
    /**
     * The floating label for a field.
     */
    label?: string;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
    /**
     * The placeholder text.
     */
    placeholder?: string;
    /**
     * Hint text to be shown underneath the form field control.
     */
    helpText?: string;
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Executed with an input value from user.
     */
    onValueChange?: (data: {
        /**
         * Value of the input
         */
        value: T;
    }) => Promise<void>;
    /**
     * Executed when user starts typing.
     */
    onValueChangeStart?: () => Promise<void>;
    /**
     * Wether value of the field should be emitted when user is blurred out of the control.
     */
    updateOnBlur?: boolean;
}
