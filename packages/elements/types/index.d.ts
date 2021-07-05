import { DraymanCheckbox } from '../dist/types/checkbox/src/app/models/checkbox-options';
import { DraymanClavizCharts } from '../dist/types/claviz-charts/src/app/models/claviz-charts-options';
import { DraymanDatepicker } from '../dist/types/datepicker/src/app/models/datepicker-options';
import { DraymanFileUploader } from '../dist/types/file-uploader/src/app/models/file-uploader-options';
import { DraymanMenu } from '../dist/types/menu/src/app/models/menu-options';
import { DraymanNgxCharts } from '../dist/types/ngx-charts/src/app/models/ngx-charts-options';
import { DraymanNgxGraph } from '../dist/types/ngx-graph/src/app/models/ngx-graph-options';
import { DraymanNumberField } from '../dist/types/number-field/src/app/models/number-field-options';
import { DraymanPdfViewer } from '../dist/types/pdf-viewer/src/app/models/pdf-viewer-options';
import { DraymanRadioGroup } from '../dist/types/radio-group/src/app/models/radio-group-options';
import { DraymanSelect } from '../dist/types/select/src/app/models/select-options';
import { DraymanButton } from '../dist/types/shared/models/button-options';
import { DraymanTable } from '../dist/types/table/src/app/models/table-options';
import { DraymanTextField } from '../dist/types/text-field/src/app/models/text-field-options';
import { DraymanTextareaField } from '../dist/types/textarea-field/src/app/models/textarea-field-options';
import { DraymanTimepicker } from '../dist/types/timepicker/src/app/models/timepicker-options';
import { DraymanYoutubePlayer } from '../dist/types/youtube-player/src/app/models/youtube-player-options';

declare global {
    /**
     * # <drayman-button \/>
     * Button powered by [Angular Material](https://material.angular.io/) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-button.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     let counter = 0;
     *
     *     return () => {
     *
     *         return (
     *             <div>
     *                 <drayman-button
     *                     label="Click me"
     *                     onClick={async () => {
     *                         counter++;
     *                         await forceUpdate();
     *                     }}
     *                 />
     *                 <p>Button was clicked {counter} times</p>
     *             </div>
     *         );
     *     }
     * }
     * ```
     */
    interface DraymanButtonProps extends DraymanButton { }
    /**
     * # <drayman-table \/>
     *
     * Table powered by [Angular Material](https://material.angular.io/) library.
     *
     * ## Example of usage
     *
     * ### Simple table with built-in pagination, sort and search.
     * ![](media://drayman-table-default.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     const data = [
     *         { name: { value: 'Carbon' }, weight: { value: 12.0107 }, symbol: { value: 'C' } },
     *         { name: { value: 'Hydrogen' }, weight: { value: 1.0079 }, symbol: { value: 'H' } },
     *         { name: { value: 'Fluorine' }, weight: { value: 18.9984 }, symbol: { value: 'F' } },
     *         { name: { value: 'Boron' }, weight: { value: 10.811 }, symbol: { value: 'B' } },
     *         { name: { value: 'Lithium' }, weight: { value: 6.941 }, symbol: { value: 'Li' } },
     *         { name: { value: 'Helium' }, weight: { value: 4.0026 }, symbol: { value: 'He' } },
     *         { name: { value: 'Neon' }, weight: { value: 20.1797 }, symbol: { value: 'Ne' } },
     *         { name: { value: 'Nitrogen' }, weight: { value: 14.0067 }, symbol: { value: 'N' } },
     *         { name: { value: 'Oxygen' }, weight: { value: 15.9994 }, symbol: { value: 'O' } },
     *         { name: { value: 'Beryllium' }, weight: { value: 9.0122 }, symbol: { value: 'Be' } },
     *     ];
     *
     *     const columns = [{
     *         field: 'name',
     *         label: 'Name',
     *     }, {
     *         field: 'weight',
     *         label: 'Weight',
     *     }, {
     *         field: 'symbol',
     *         label: 'Symbol',
     *     }];
     *
     *     return () => <drayman-table key="table" pagination sort search columns={columns} data={data} />;
     * }
     * ```
     *
     * ### Table with remote data, pagination and search (`disableInternalProcessing` set to `true`).
     * ![](media://drayman-table-server-side.gif)
     *
     * ```typescript
     * import axios from 'axios';
     *
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     const API_KEY = ``;
     *     let data = [];
     *     let itemCount;
     *     let pageIndex = 0;
     *     let searchValue = 'brea';
     *
     *     const getMovieResponse = async () => {
     *         const page = pageIndex + 1;
     *         const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${page}`);
     *         data = getTableData(result.data.results.map(x => ({ title: x.title, rating: x.vote_average })));
     *         pageIndex = result.data.page - 1;
     *         itemCount = result.data.total_results;
     *     }
     *
     *     await getMovieResponse();
     *
     *     return () => {
     *         const options = {
     *             data,
     *             columns: [{
     *                 field: 'title',
     *                 label: 'Title',
     *             }, {
     *                 field: 'rating',
     *                 label: 'Rating',
     *             }],
     *             pagination: true,
     *             pageSizeOptions: [],
     *             pageSize: 20,
     *             search: true,
     *             disableInternalProcessing: true,
     *             itemCount,
     *             pageIndex,
     *             initialSearchValue: searchValue,
     *             onPageChange: async (data) => {
     *                 pageIndex = data.pageIndex;
     *                 await getMovieResponse();
     *                 await forceUpdate();
     *             },
     *             onSearchChange: async ({ value }) => {
     *                 searchValue = value;
     *                 await getMovieResponse();
     *                 await forceUpdate();
     *             },
     *         }
     *
     *         return <drayman-table {...options} />;
     *     };
     * }
     *
     * function getTableData(data) {
     *     return data.map(x => Object.fromEntries(
     *         Object.entries(x).map(([key, value]) => [key, { value }])
     *     ));
     * }
     * ```
     *
     * ### Table with editable fields
     * ![](media://drayman-table-editable.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     const data = [];
     *
     *     return () => {
     *         return <drayman-table
     *             data={data}
     *             columns={[{
     *                 field: 'name',
     *                 label: 'Name',
     *                 type: 'text-field',
     *             }, {
     *                 field: 'age',
     *                 label: 'Age',
     *                 type: 'number-field',
     *             }]}
     *             toolbarButtons={[{
     *                 view: 'icon',
     *                 icon: 'add'
     *             }]}
     *             onToolbarButtonClick={async ({ selectedRows, buttonDefinition }) => {
     *                 data.push({
     *                     name: { value: null },
     *                     age: { value: null },
     *                     id: { value: data.length },
     *                 });
     *                 await forceUpdate();
     *             }}
     *             onCellValueChange={async ({ row, field, value }) => {
     *                 const rowToEdit = data.find(x => x.id.value === row.id.value);
     *                 rowToEdit[field].value = value;
     *                 rowToEdit[field].error = field === 'age' && value < 18 ? 'Too young' : null;
     *                 await forceUpdate();
     *             }}
     *             title="Editable data grid"
     *         />;
     *     };
     * }
     * ```
     */
    interface DraymanTableProps extends DraymanTable { }
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
    interface DraymanCheckboxProps extends DraymanCheckbox { }
    /**
     * # <drayman-claviz-charts \/>
     *
     * Charts powered by [claviz-charts](https://github.com/Claviz/claviz-charts) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-claviz-charts.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *
     *     let selected: { value: number; label: string; };
     *
     *     return () => {
     *         const onClick = async (data) => {
     *             selected = data;
     *             await forceUpdate();
     *         }
     *
     *         return (
     *             <div style={{ height: '200px' }}>
     *                 <drayman-claviz-charts
     *                     data={
     *                         [
     *                             {
     *                                 color: 'black',
     *                                 label: 'Fruits',
     *                                 data: [
     *                                     {
     *                                         value: 10,
     *                                         label: 'Apples',
     *                                         color: 'green'
     *                                     },
     *                                     {
     *                                         value: 5,
     *                                         label: 'Oranges',
     *                                         color: 'orange'
     *                                     }
     *                                 ]
     *                             },
     *                             {
     *                                 color: 'black',
     *                                 label: 'Vegetables',
     *                                 data: [
     *                                     {
     *                                         value: 12,
     *                                         label: 'Tomatoes',
     *                                         color: 'red'
     *                                     },
     *                                 ]
     *                             }
     *                         ]}
     *                     onClick={onClick}
     *                 />
     *                 {selected && `You have selected ${selected.value} ${selected.label}!`}
     *             </div>
     *         )
     *     }
     * }
     * ```
     */
    interface DraymanClavizChartsProps extends DraymanClavizCharts { }
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
    interface DraymanDatepickerProps extends DraymanDatepicker { }
    /**
     * # <drayman-file-uploader \/>
     *
     * File uploader powered by [FilePond](https://pqina.nl/filepond/) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-file-uploader.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     let file;
     *
     *     return () => (
     *         <div>
     *             <drayman-file-uploader
     *                 onUpload={async (_, [uploadedFile]) => {
     *                     file = uploadedFile;
     *                     await forceUpdate();
     *                     return '123';
     *                 }}
     *             />
     *             {file && <img src={`data:${file.mimetype};base64,${file.buffer.toString('base64')}`} style={{ width: '200px;' }} />}
     *         </div>
     *     )
     * }
     * ```
     */
    interface DraymanFileUploaderProps extends DraymanFileUploader { }
    /**
     * # <drayman-ngx-charts \/>
     *
     * Charts powered by [ngx-charts](https://github.com/swimlane/ngx-charts) library.
     *
     * ## Example of usage
     *
     * ### Simple pie chart
     *
     * ![](media://drayman-ngx-charts.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     return () => (
     *         <drayman-ngx-charts
     *             type="pie"
     *             results={
     *                 [
     *                     { name: 'Cherries', value: 10 },
     *                     { name: 'Blueberries', value: 20 },
     *                 ]
     *             }
     *             labels
     *         />
     *     );
     * }
     * ```
     */
    interface DraymanNgxChartsProps extends DraymanNgxCharts { }
    /**
     * # <drayman-ngx-graph \/>
     *
     * Graph powered by [ngx-charts](https://github.com/swimlane/ngx-graph) library.
     *
     * ## Example of usage
     *
     * ### Simple graph
     *
     * ![](media://drayman-ngx-graph.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *
     *     const links = [{
     *         id: 'a',
     *         source: 'first',
     *         target: 'second',
     *         label: 'is parent of'
     *     }, {
     *         id: 'b',
     *         source: 'first',
     *         target: 'third',
     *         label: 'custom label'
     *     }];
     *
     *     return () => (
     *         <div style={{ height: '300px', width: '300px' }}>
     *             <button
     *                 onClick={async () => {
     *                     links.push({
     *                         id: `new-link-${links.length}`,
     *                         source: 'first',
     *                         target: 'third',
     *                         label: 'new link'
     *                     })
     *                     await forceUpdate();
     *                 }}
     *             >Add link</button>
     *             <drayman-ngx-graph
     *                 showMiniMap
     *                 links={links}
     *                 nodes={[{
     *                     id: 'first',
     *                     label: 'A'
     *                 }, {
     *                     id: 'second',
     *                     label: 'B'
     *                 }, {
     *                     id: 'third',
     *                     label: 'C',
     *                     data: {
     *                         customColor: 'orange'
     *                     }
     *                 }]}
     *             />
     *         </div>
     *     );
     * }
     * ```
     */
    interface DraymanNgxGraphProps extends DraymanNgxGraph { }
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
    interface DraymanNumberFieldProps extends DraymanNumberField { }
    /**
     * # <drayman-pdf-viewer \/>
     *
     * PDF viewer powered by [ng2-pdf-viewer](https://github.com/VadimDez/ng2-pdf-viewer) library.
     *
     * ## Example of usage
     *
     * ### PDF viewer displaying all pages
     *
     * ![](media://drayman-pdf-viewer-scroll.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     return () => (
     *         <div style={{ height: '100%' }}>
     *             <drayman-pdf-viewer
     *                 src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
     *             />
     *         </div>
     *     );
     * }
     * ```
     *
     * ### PDF viewer displaying each page separately
     *
     * ![](media://drayman-pdf-viewer-paginated.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     let page = 1;
     *     const pageCount = 3;
     *
     *     const wrapperStyle: CSS = {
     *         display: 'flex',
     *         flexDirection: 'column',
     *         height: '100%'
     *     }
     *
     *     const onPageChange = async (step) => {
     *         if (page + step >= 1 && page + step <= pageCount) {
     *             page += step;
     *             await forceUpdate();
     *         }
     *     }
     *
     *     return () => {
     *         const prevPageBtn = {
     *             disabled: page === 1,
     *             onClick: onPageChange.bind(this, -1),
     *         }
     *
     *         const nextPageBtn = {
     *             disabled: page === pageCount,
     *             onClick: onPageChange.bind(this, 1),
     *         }
     *
     *         return (
     *             <div style={wrapperStyle}>
     *                 <div style={{ display: 'flex' }}>
     *                     <button {...prevPageBtn}>Previous page</button>
     *                     <button {...nextPageBtn}>Next page</button>
     *                 </div>
     *                 <drayman-pdf-viewer
     *                     src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
     *                     page={page}
     *                 />
     *             </div>
     *         );
     *     };
     * }
     * ```
     */
    interface DraymanPdfViewerProps extends DraymanPdfViewer { }
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
    interface DraymanRadioGroupProps extends DraymanRadioGroup { }
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
    interface DraymanSelectProps extends DraymanSelect { }
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
    interface DraymanTextFieldProps extends DraymanTextField { }
    /**
     * # <drayman-textarea-field \/>
     *
     * Textarea field powered by [Angular Material](https://material.angular.io/) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-textarea-field.gif)
     *
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     let text = 'Hello, <b>world</b>!';
     *
     *     const onValueChange = async ({ value }) => {
     *         text = value;
     *         await forceUpdate();
     *     }
     *
     *     return () => {
     *         return (
     *             <div>
     *                 <drayman-textarea-field
     *                     label="Text"
     *                     onValueChange={onValueChange}
     *                     value={text}
     *                 />
     *                 {text && <p>{text}</p>}
     *             </div>
     *         )
     *     };
     * }
     * ```
     */
    interface DraymanTextareaFieldProps extends DraymanTextareaField { }
    /**
     * # <drayman-timepicker \/>
     *
     * Timepicker powered by [ngx-material-timepicker](https://github.com/Agranom/ngx-material-timepicker) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-timepicker.gif)
     *
     * ```typescript
     * import customParseFormat = require('dayjs/plugin/customParseFormat');
     * import dayjs from 'dayjs';
     * dayjs.extend(customParseFormat);
     *
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *
     *     const time: { start?: string; end?: string } = {};
     *     let timeLeft: { hours: number; minutes: number };
     *
     *     const onTimeChange = async (timeType: 'start' | 'end', { value }) => {
     *         time[timeType] = value;
     *         if (time.start && time.end) {
     *             const start = dayjs(time.start, 'HH:mm');
     *             const end = dayjs(time.end, 'HH:mm');
     *             timeLeft = { hours: end.diff(start, 'hours'), minutes: end.diff(start, 'minutes') % 60 };
     *             await forceUpdate();
     *         }
     *     }
     *
     *     const wrapperStyle: CSS = {
     *         display: 'grid',
     *         gridAutoFlow: 'column',
     *     }
     *
     *     return () => {
     *         return <div>
     *             <div style={wrapperStyle}>
     *                 <drayman-timepicker
     *                     label="Start time"
     *                     onValueChange={onTimeChange.bind(this, 'start')}
     *                     value={time.start}
     *                 />
     *                 <drayman-timepicker
     *                     label="End time"
     *                     onValueChange={onTimeChange.bind(this, 'end')}
     *                     showNowButton
     *                     value={time.end}
     *                 />
     *             </div>
     *             {timeLeft && <p>Time left: {timeLeft.hours} hours and {timeLeft.minutes} minutes.</p>}
     *         </div>;
     *     }
     * }
     * ```
     */
    interface DraymanTimepickerProps extends DraymanTimepicker { }
    /**
     * # <drayman-youtube-player \/>
     *
     * Youtube player powered by [Angular Material](https://material.angular.io/) library.
     *
     * ## Example of usage
     *
     * ### Auto-play youtube video.
     * ```typescript
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *
     *     return () => {
     *         return <div style={{ height: '500px' }}>
     *             <drayman-youtube-player
     *                 videoId="UEzl9JYkH5M"
     *                 playerVars={{ autoplay: 1 }}
     *             />
     *         </div>
     *     }
     * }
     * ```
     */
    interface DraymanYoutubePlayerProps extends DraymanYoutubePlayer { }
    /**
     * # <drayman-menu \/>
     *
     * Menu powered by [Angular Material](https://material.angular.io/) library.
     *
     * ## Example of usage
     *
     * ![](media://drayman-menu.gif)
     *
     * ```typescript
     * import axios from 'axios';
     *
     * export const component: DraymanComponent = async ({ forceUpdate }) => {
     *     let selectedImg;
     *     let selectedBreed;
     *     const dogBreeds = (await axios.get(`https://dog.ceo/api/breeds/list/all`)).data.message;
     *
     *     return () => {
     *         return (
     *             <div>
     *                 <drayman-menu
     *                     label={`${selectedBreed || 'Dog'}`}
     *                     items={
     *                         Object
     *                             .keys(dogBreeds)
     *                             .map(x => ({
     *                                 label: x,
     *                                 breed: x,
     *                                 items: dogBreeds[x].map(xx => ({ label: xx, breed: `${x}/${xx}` })),
     *                             }))
     *                     }
     *                     onItemClick={async ({ item }) => {
     *                         selectedImg = (await axios.get(`https://dog.ceo/api/breed/${item.breed}/images/random`)).data.message;
     *                         selectedBreed = item.breed;
     *                         await forceUpdate();
     *                     }}
     *                 />
     *                 {selectedImg && <img src={selectedImg} style={{ width: '350px', height: 'auto' }} />}
     *             </div>
     *         );
     *     }
     * }
     * ```
     */
    interface DraymanMenuProps extends DraymanMenu { }
    namespace JSX {
        export interface IntrinsicElements {
            'drayman-button': DraymanButtonProps;
            'drayman-menu': DraymanMenuProps;
            'drayman-checkbox': DraymanCheckboxProps;
            'drayman-claviz-charts': DraymanClavizChartsProps;
            'drayman-datepicker': DraymanDatepickerProps;
            'drayman-file-uploader': DraymanFileUploaderProps;
            'drayman-ngx-charts': DraymanNgxChartsProps;
            'drayman-ngx-graph': DraymanNgxGraphProps;
            'drayman-number-field': DraymanNumberFieldProps;
            'drayman-pdf-viewer': DraymanPdfViewerProps;
            'drayman-radio-group': DraymanRadioGroupProps;
            'drayman-select': DraymanSelectProps;
            'drayman-table': DraymanTableProps;
            'drayman-text-field': DraymanTextFieldProps;
            'drayman-textarea-field': DraymanTextareaFieldProps;
            'drayman-timepicker': DraymanTimepickerProps;
            'drayman-youtube-player': DraymanYoutubePlayerProps;
        }
    }
}

export { };