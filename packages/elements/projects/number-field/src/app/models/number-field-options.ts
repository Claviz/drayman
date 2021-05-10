import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';
import { AutocompleteOptionsBase } from '../../../../shared/models/autocomplete-options-base';

/**
 * # <drayman-number-field \/>
 *
 * Number field powered by [Angular Material](https://material.angular.io/) library.
 *
 * ## Example of usage
 *
 * ![](media://drayman-number-field.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let celsius;
 *     let fahrenheit;
 *     let typing = false;
 * 
 *     return () => {
 * 
 *         return (
 *             <div>
 *                 <drayman-number-field
 *                     value={fahrenheit}
 *                     label="Temperature in Fahrenheit (°F)"
 *                     onValueChangeStart={async () => {
 *                         typing = true;
 *                         await forceUpdate();
 *                     }}
 *                     onValueChange={async ({ value }) => {
 *                         typing = false;
 *                         fahrenheit = value;
 *                         celsius = (value - 32) / 1.8;
 *                         await forceUpdate();
 *                     }}
 *                 />
 *                 <div>{celsius && `${fahrenheit}°F = ${Math.round(celsius * 100) / 100}°C`}</div>
 *                 <div>{typing ? `You are typing!` : `You aren't typing!`}</div>
 *             </div>
 *         )
 *     };
 * }
 * ```
 */
export interface DraymanNumberField extends AutocompleteOptionsBase<number> {
}