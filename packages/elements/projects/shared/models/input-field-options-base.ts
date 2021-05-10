import { FieldOptionsBase } from './field-options-base';

export interface InputFieldOptionsBase<T> extends FieldOptionsBase<T> {
    /**
     * Appearance style for the field.
     * Wether `outline` (default), `legacy`, `fill` or `standard`.
     */
    appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
}