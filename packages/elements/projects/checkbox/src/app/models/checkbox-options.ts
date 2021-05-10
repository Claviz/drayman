import { FieldOptionsBase } from '../../../../shared/models/field-options-base';

/**
 * # <drayman-checkbox \/>
 * 
 * Checkbox powered by [Angular Material](https://material.angular.io/) library.
 *
 * ## Example of usage
 * 
 * ![](media://drayman-checkbox.gif)
 * 
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     let checked = false;
 * 
 *     const onValueChange = async ({ value }) => {
 *         checked = value;
 *         await forceUpdate();
 *     }
 * 
 *     return () => {
 *         return (
 *             <drayman-checkbox
 *                 value={checked}
 *                 label={checked ? `Uncheck me!` : `Check me!`}
 *                 onValueChange={onValueChange}
 *             />
 *         );
 *     }
 * }
 * ```
 */
export interface DraymanCheckbox extends FieldOptionsBase<boolean> {
    /**
    * @ignore
    */
    placeholder?: never;
    /**
    * @ignore
    */
    helpText?: never;
    /**
    * @ignore
    */
    error?: never;
}
