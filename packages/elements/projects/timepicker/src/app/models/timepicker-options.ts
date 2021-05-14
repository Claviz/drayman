import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

export interface DraymanTimepicker extends InputFieldOptionsBase<string> {
    /**
     * Wether to show now button or not.
     */
    showNowButton?: boolean;
}
