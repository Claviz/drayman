import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

export interface DraymanTextareaField extends InputFieldOptionsBase<string> {
    /**
     * The number of visible text lines for the control.
     */
    rows?: number;
}
