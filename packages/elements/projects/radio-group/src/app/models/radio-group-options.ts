import { FieldOptionsBase } from '../../../../shared/models/field-options-base';

export interface DraymanRadioGroup extends FieldOptionsBase<string> {
    /**
     * Array of radio button options.
     */
    options?: {
        value: any;
        label: string;
    }[];
    /**
     * Direction of option list.
     * `column` by default.
     */
    direction?: 'column' | 'row';
    /**
    * @ignore
    */
    placeholder?: never;
}
