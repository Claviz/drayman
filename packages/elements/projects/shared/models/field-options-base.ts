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
    onValueChange?: ElementEvent<{ value: T }>;
    /**
     * Wether value of the field should be emitted when user is blurred out of the control.
     */
    updateOnBlur?: boolean;
}
