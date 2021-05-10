import { FieldOptionsBase } from '../../../../shared/models/field-options-base';

/**
 * # <drayman-radio-group \/>
 * 
 * Radio button powered by [Angular Material](https://material.angular.io/) library.
 *
 * ## Example of usage
 * 
 * ![](media://drayman-radio-group.gif)
 * 
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let favSeason;
 *     let favAnimal;
 * 
 *     const onSeasonChange = async ({ value }) => {
 *         favSeason = value;
 *         await forceUpdate();
 *     }
 * 
 *     const onAnimalChange = async ({ value }) => {
 *         favAnimal = value;
 *         await forceUpdate();
 *     }
 * 
 *     return () => {
 *         const seasonRadioGroup = {
 *             options: [{
 *                 label: 'Winter',
 *                 value: 'winter'
 *             }, {
 *                 label: 'Spring',
 *                 value: 'spring'
 *             }, {
 *                 label: 'Summer',
 *                 value: 'summer'
 *             }, {
 *                 label: 'Autumn',
 *                 value: 'autumn'
 *             }],
 *             label: 'Pick your favorite season',
 *             onValueChange: onSeasonChange,
 *             value: favSeason,
 *         }
 * 
 *         const animalRadioGroup = {
 *             options: [{
 *                 label: 'Dog',
 *                 value: 'dog'
 *             }, {
 *                 label: 'Cat',
 *                 value: 'cat'
 *             }],
 *             label: 'Pick your favorite animal',
 *             onValueChange: onAnimalChange,
 *             value: favAnimal,
 *         }
 * 
 *         return (
 *             <div>
 *                 <drayman-radio-group {...seasonRadioGroup} />
 *                 <drayman-radio-group {...animalRadioGroup} direction="row" />
 *                 <div>{favSeason && `Your favorite season is ${favSeason}.`}</div>
 *                 <div>{favAnimal && `Your favorite animal is ${favAnimal}.`}</div>
 *             </div>
 *         );
 *     };
 * }
 * ```
 */
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
