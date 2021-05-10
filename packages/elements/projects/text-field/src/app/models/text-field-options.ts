import { InputMaskOptionsBase } from '../../../../shared/models/input-mask-options-base';
import { AutocompleteOptionsBase } from '../../../../shared/models/autocomplete-options-base';
import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

/**
 * # <drayman-text-field \/>
 * 
 * Text field powered by [Angular Material](https://material.angular.io/) and [ngx-mask](https://jsdaddy.github.io/ngx-mask-page) libraries.
 *
 * ## Example of usage
 * 
 * ### Simple text field
 * 
 * ![](media://drayman-text-field.gif)
 * 
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let name = '';
 *     let typing = false;
 * 
 *     return () => {
 *         // User started typing
 *         const onValueChangeStart = async () => {
 *             typing = true;
 *             await forceUpdate();
 *         }
 * 
 *         // User stopped typing with some `value`
 *         const onValueChange = async ({ value }) => {
 *             typing = false;
 *             name = value;
 *             await forceUpdate();
 *         }
 * 
 *         return <div>
 *             <drayman-text-field
 *                 label="Name"
 *                 value={name}
 *                 onValueChangeStart={onValueChangeStart}
 *                 onValueChange={onValueChange}
 *             />
 *             <div>
 *                 {name && <p>Hello, {name}!</p>}
 *                 <p>{typing ? `You are typing!` : `You aren't typing!`}</p>
 *             </div>
 *         </div>
 *     };
 * }
 * ```
 * 
 * ### Text field with autocomplete and remote result caching.
 *
 * ![](media://drayman-text-field-autocomplete.gif)
 *
 * ```typescript
 * import axios from 'axios';
 * import _ from 'lodash';
 * 
 * const getCountriesFromCache = _.memoize(async (value) => {
 *     const result = await axios.get(`https://api.first.org/data/v1/countries?q=${value}&limit=10`);
 *     return Object.values(result.data.data).map((x: any) => ({ value: x.country, label: x.country }));
 * });
 * 
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     let countries: { value: string; label: string; }[] = [];
 *     let searchValue = '';
 * 
 *     const getCountries = async () => {
 *         countries = await getCountriesFromCache(searchValue);
 *         await forceUpdate();
 *     }
 * 
 *     return () => {
 *         return (
 *             <drayman-text-field
 *                 label="Country"
 *                 value={searchValue}
 *                 suggestions={countries}
 *                 onFocus={
 *                     async () => {
 *                         if (!countries.length) {
 *                             await getCountries();
 *                         }
 *                     }
 *                 }
 *                 onValueChange={
 *                     async ({ value }) => {
 *                         searchValue = value;
 *                         await getCountries();
 *                     }
 *                 }
 *             />
 *         );
 *     }
 * }
 * ```
 */
export interface DraymanTextField extends InputFieldOptionsBase<string>, AutocompleteOptionsBase<string>, InputMaskOptionsBase {
}
