import { FieldOptionsBase } from '../../../../shared/models/field-options-base';

/**
 * # <drayman-select \/>
 *
 * Select field powered by [Angular Material](https://material.angular.io/) and [ngx-mat-select-search](https://github.com/bithost-gmbh/ngx-mat-select-search) libraries.
 * It can render a set of provided options (by specifying `options` field) or load them from a remote resource (by providing `loadOptions` function).
 *
 * ## Example of usage
 *
 * ### Loading from remote resource
 * ![](media://drayman-select.gif)
 *
 * ```typescript
 * import axios from 'axios';
 * 
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 * 
 *     const API_KEY = ``;
 *     let selectedMovie;
 *     let movies = [];
 * 
 *     return () => {
 *         const options = {
 *             options: movies.map(x => ({ value: x.id, label: x.title })),
 *             label: 'Movie title',
 *             onSearchChange: async ({ value }) => {
 *                 if (!value) {
 *                     movies = [];
 *                 } else {
 *                     const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`);
 *                     movies = result.data.results;
 *                 }
 *                 await forceUpdate();
 *             },
 *             onValueChange: async ({ value }) => {
 *                 selectedMovie = movies.find(x => x.id === value);
 *                 await forceUpdate();
 *             },
 *             value: selectedMovie?.id,
 *         }
 * 
 *         return (
 *             <div style={{ padding: '0 30px' }}>
 *                 <drayman-select  {...options} />
 *                 {selectedMovie &&
 *                     <div>
 *                         <h3>{selectedMovie.title}</h3>
 *                         <img src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} />
 *                         <p><b>📅 {selectedMovie.release_date}</b></p>
 *                         <p><b>⭐ {selectedMovie.vote_average} / 10</b></p>
 *                         <p><i>📝 {selectedMovie.overview}</i></p>
 *                     </div>
 *                 }
 *             </div>
 *         );
 *     }
 * }
 * ```
 * 
 * ### Rendering provided options
 * ![](media://drayman-select-basic.gif)
 *
 * ```typescript
 * export const component: DraymanComponent = async ({ forceUpdate }) => {
 *     let colorHex;
 * 
 *     return () => {
 *         const options = {
 *             label: 'Color',
 *             options: [
 *                 { label: 'Red', value: '#e0091e' },
 *                 { label: 'Green', value: '#2e8b57' },
 *                 { label: 'Blue', value: '#3b90ff' },
 *             ],
 *             onValueChange: async ({ value }) => {
 *                 colorHex = value;
 *                 await forceUpdate();
 *             },
 *             value: colorHex,
 *         }
 * 
 *         return (
 *             <div style={{ padding: '0 30px' }}>
 *                 <drayman-select  {...options} />
 *                 {colorHex &&
 *                     <div>
 *                         <div style={{ backgroundColor: colorHex, width: '100px', height: '100px' }}></div>
 *                         <p>Selected color hex: {colorHex}</p>
 *                     </div>
 *                 }
 *             </div>
 *         );
 *     }
 * }
 * ```
 */
export interface DraymanSelect extends FieldOptionsBase<any> {
    /**
     * Array of options that populate the select menu.
     */
    options?: {
        value: any;
        label: string;
    }[];
    /**
     * This function can be used to override default selection search algorithm.
     * Accepts value of the search input. Can be `null`.
     * If this function is not defined, options will be filtered client-side. 
     */
    onSearchChange?: (data: {
        /**
         * Value of the search input.
         */
        value: string
    }) => Promise<void>;
    /**
     * Whether the user should be allowed to select multiple options.
     */
    multiple?: boolean;
}