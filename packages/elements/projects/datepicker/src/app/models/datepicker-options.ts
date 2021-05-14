import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

export interface DraymanDatepicker extends InputFieldOptionsBase<string> {
    /**
     * In which format date will be displayed. 
     * Defaults to `YYYY-MM-DD`.
     */
    dateFormat?: string;
    /**
     * Wether to show today button or not.
     */
    showTodayButton?: boolean;
}
