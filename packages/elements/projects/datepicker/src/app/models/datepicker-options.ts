import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

/**
 * # <drayman-datepicker \/>
 * 
 * Datepicker powered by [Angular Material](https://material.angular.io/) library.
 * Accepts as an input and emits on change a date in `ISO 8601` format.
 *
 * ## Example of usage
 * 
 * ![](media://drayman-datepicker.gif)
 * 
 * ```typescript
 * import dayjs from 'dayjs';
 * 
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     let age;
 *     let date;
 * 
 *     const onValueChange = async ({ value }) => {
 *         date = value;
 *         const dateOfBirth = dayjs(value);
 *         age = dayjs().diff(dateOfBirth, 'years');
 *         await forceUpdate();
 *     }
 * 
 *     return () => {
 *         return (
 *             <div>
 *                 <drayman-datepicker
 *                     value={date}
 *                     label="Date of Birth"
 *                     onValueChange={onValueChange}
 *                 />
 *                 {age && `You are ${age} years old!`}
 *             </div>
 *         )
 *     }
 * }
 * ```
 */
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
