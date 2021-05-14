import { DraymanFileUploader } from '../../../../file-uploader/src/app/models/file-uploader-options';
import { DraymanSelect } from '../../../../select/src/app/models/select-options';
import { DraymanNumberField } from '../../../../number-field/src/app/models/number-field-options';
import { DraymanButton } from '../../../../shared/models/button-options';
import { DraymanTextField } from '../../../../text-field/src/app/models/text-field-options';
import { DraymanCheckbox } from '../../../../checkbox/src/app/models/checkbox-options';
import { DraymanDatepicker } from '../../../../datepicker/src/app/models/datepicker-options';
import { DraymanTimepicker } from '../../../../timepicker/src/app/models/timepicker-options';
import { InputMaskOptionsBase } from '../../../../shared/models/input-mask-options-base';

export interface DraymanTable {
    /**
     * Title of the table.
     * `Table` by default.
     */
    title?: string;
    /**
     * Table column definitions.
     */
    columns: DraymanTableColumn[];
    /**
     * Table row data.
     */
    data: DraymanTableRow[];
    /**
     * Style for each row in data.
     */
    rowStyle?: any[];
    /**
     * Used to rearrange rows by dragging the row with the mouse.
     * Row dragging will be disabled if `pagination`, `sort` or `search` is enabled.
     */
    rowDrag?: boolean;
    /**
     * Enables search bar.
     */
    search?: boolean;
    /**
     * Enables paginator.
     */
    pagination?: boolean;
    /**
     * Enables column sorting.
     */
    sort?: boolean;
    /**
     * Controls page size number shown in paginator if `disableInternalProcessing` is enabled.
     */
    pageSize?: number;
    /**
    * Controls page index shown in paginator if `disableInternalProcessing` is enabled.
    */
    pageIndex?: number;
    /**
    * Controls item count number shown in paginator if `disableInternalProcessing` is enabled.
    */
    itemCount?: number;
    /**
     * The set of provided page size options to display to the user.
     * Defaults to `[5, 10, 25, 100]`.
     */
    pageSizeOptions?: number[];
    /**
     * Initial value for search bar.
     */
    initialSearchValue?: string;
    /**
     * Event fired when user clicks a cell with the `button` type.
     */
    onCellButtonClick?: (data: {
        row: DraymanTableRow;
        field: string;
        rowIndex: number;
    }) => Promise<void>;
    /**
     * Event fired when user rearranges some row.
     */
    onRowDragEnd?: (data: {
        row: DraymanTableRow;
        currentIndex: number;
        previousIndex: number;
    }) => Promise<void>;
    /**
     * Event fired when user changes a page or page size.
     */
    onPageChange?: (data: {
        pageIndex: number;
        pageSize: number;
    }) => Promise<void>;
    /**
     * Event fired when user performs a sort on some column.
     */
    onSortChange?: (data: {
        field: string;
        order: 'asc' | 'desc';
    }) => Promise<void>;
    /**
     * Event fired when user changes a value of cell with the `text-field`, `number-field` or `selection`.
     */
    onCellValueChange?: (data: {
        row: DraymanTableRow;
        field: string;
        value: any;
        rowIndex: number;
    }) => Promise<void>;
    /**
     * Event fired when user clicks a cell.
     */
    onCellClick?: (data: {
        row: DraymanTableRow;
        field: string;
        rowIndex: number;
    }) => Promise<void>;
    /**
     * Event fired when user double-clicks a cell.
     */
    onCellDblClick?: (data: {
        row: DraymanTableRow;
        field: string;
        rowIndex: number;
    }) => Promise<void>;
    onCellValueChangeStart?: () => Promise<void>;
    /**
     * Event fired when user performs a search.
     */
    onSearchChange?: (data: {
        /**
         * Value of the search input.
         */
        value: string
    }) => Promise<void>;
    // actions?: ButtonOptionsBase[];
    /**
     * Disables internal pagination, sorting and search algorithms applied after every data change and firing of event.
     * Allows to apply custom logic for pagination, sort and search.
     */
    disableInternalProcessing?: boolean;
    /**
     * Controls appearance of the column header.
     */
    disableHeader?: boolean;
    /**
     * Wether to enable row selection or not.
     */
    select?: boolean;
    /**
     * List of toolbar buttons.
     */
    toolbarButtons?: DraymanToolbarButton[];
    /**
     * Event fired when user clicks a toolbar button.
     */
    onToolbarButtonClick?: (data: {
        selectedRows: {
            row: DraymanTableRow;
            rowIndex: number;
        }[];
        buttonDefinition: DraymanToolbarButton;
    }) => Promise<void>;
    /**
     * This function can be used to override default cells with `select` type search algorithm.
     * Accepts value of the search input. Can be `null`.
     * If this function is not defined, options will be filtered client-side. 
     */
    onSelectSearchChange?: (data: {
        row: DraymanTableRow;
        field: string;
        /**
         * Value of the search input.
         */
        value: string;
        rowIndex: number;
    }) => Promise<void>;
    /**
     * Manages `onFocus` event.
     */
    onCellFocus?: (data: {
        row: DraymanTableRow;
        field: string;
        rowIndex: number;
    }) => Promise<void>;
    /**
     * Executed when file is uploaded.
     * This function contains uploaded file and must return a unique file ID.
     * This unique ID is then used to revert uploads.
     */
    onFileUpload?: (data: {
        row: DraymanTableRow;
        field: string;
        rowIndex: number;
    }, files: (File | any)[]) => Promise<string>;
    /**
     * Executed when user wants to remove a file.
     * Receives unique file ID `fileId`.
     * This function is usually used to remove a specific file from file system.
     */
    onRemoveUploadedFile?: (data: {
        row: DraymanTableRow;
        field: string;
        fileId: string;
        rowIndex: number;
    }) => Promise<string>;
}

export type CellType = 'text' | 'text-field' | 'button' | 'number-field' | 'select' | 'file-uploader' | 'checkbox' | 'datepicker' | 'timepicker';

export interface GridCellBase {
    type?: CellType;
    style?: any;
}

export interface DraymanTableCellBase<T> extends GridCellBase {
    value: T;
}

export interface DraymanTableTextCell extends DraymanTableCellBase<string> {
    type: 'text';
}

export interface DraymanTableSelectCell extends DraymanTableCellBase<string> {
    type: 'select';
    /**
     * Array of options that populate the select menu.
     */
    options?: {
        value: any;
        label: string;
    }[];
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the user should be allowed to select multiple options.
     */
    multiple?: boolean;
}

export interface DraymanTableFileUploaderCell extends DraymanTableCellBase<string> {
    type: 'file-uploader';
    /**
     * Array of files to show when uploader element appears.
     */
    initialFiles?: {
        /**
         * Unique file ID.
         */
        id: string;
        /**
         * Size of the file in bytes.
         */
        length: number;
        /**
         * Name of the uploaded file.
         */
        fileName: string;
        /**
         * URL that starts a download of this file.
         */
        downloadUrl: string;
    }[];
    /**
     * Wether multiple file upload is allowed or not.
     */
    allowMultiple?: boolean;
}

export interface DraymanTableTextFieldCell extends DraymanTableCellBase<string>, InputMaskOptionsBase {
    type: 'text-field';
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Wether value of the field should be emitted when user is blurred out of the control.
     */
    updateOnBlur?: boolean;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
    /**
     * Array of options that populate the autocomplete.
     */
    suggestions?: {
        value: any;
        label: string;
    }[];
    /**
     * Specify the width of the autocomplete panel. Can be any CSS sizing value, otherwise it will match the width of its host.
     */
    suggestionsPanelWidth?: string | number;
}

export interface DraymanTableCheckboxCell extends DraymanTableCellBase<boolean> {
    type: 'checkbox';
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
}

export interface DraymanTableDatepickerCell extends DraymanTableCellBase<string> {
    type: 'datepicker';
    /**
     * In which format date will be displayed. 
     * Defaults to `YYYY-MM-DD`.
     */
    dateFormat?: string;
    /**
     * Wether to show today button or not.
     */
    showTodayButton?: boolean;
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
}

export interface DraymanTableTimepickerCell extends DraymanTableCellBase<string> {
    type: 'timepicker';
    /**
     * Wether to show now button or not.
     */
    showNowButton?: boolean;
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
}

export interface DraymanTableNumberFieldCell extends DraymanTableCellBase<number> {
    type: 'number-field';
    /**
     * Error text to be shown underneath the form field control.
     */
    error?: string;
    /**
     * Wether value of the field should be emitted when user is blurred out of the control.
     */
    updateOnBlur?: boolean;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
    /**
     * Array of options that populate the autocomplete.
     */
    suggestions?: {
        value: any;
        label: string;
    }[];
    /**
     * Specify the width of the autocomplete panel. Can be any CSS sizing value, otherwise it will match the width of its host.
     */
    suggestionsPanelWidth?: string | number;
}

export interface DraymanTableButtonCell extends DraymanTableCellBase<string>, DraymanTableButton {
    type: 'button';
}

export interface DraymanToolbarButton extends DraymanTableButton {
    label?: string;
}

export interface DraymanTableButton {
    /**
     * Material style of the button.
     * `basic` by default.
     */
    view?: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'miniFab';
    /**
     * Name of the [Material icon](https://material.io/resources/icons) printed inside button.
     */
    icon?: string;
    /**
     * Tooltip shown on hover.
     */
    tooltip?: string;
    /**
     * Wether button should be disabled.
     */
    disabled?: boolean;
    /**
     * Image shown on hover.
     */
    imgUrl?: string;
    buttonStyle?: any;
    /**
     * Show this button only when some rows are selected.
     */
    selectionButton?: boolean;
}

export type DraymanTableRow = { [field: string]: DraymanTableTextCell | DraymanTableTextFieldCell | DraymanTableButtonCell | DraymanTableNumberFieldCell | DraymanTableSelectCell | DraymanTableFileUploaderCell | DraymanTableCheckboxCell | DraymanTableDatepickerCell | DraymanTableTimepickerCell };

export interface DraymanTableColumn {
    label: string;
    field: string;
    /**
     * Type of the column. 
     * Can be overridden by cell type.
     */
    type?: CellType;
    style?: any;
    pinned?: 'left' | 'right';
}

export interface GridTextFieldCell extends GridCellBase {
    type: 'text-field',
    options: DraymanTextField,
}

export interface GridCheckboxCell extends GridCellBase {
    type: 'checkbox',
    options: DraymanCheckbox,
}

export interface GridDatepickerCell extends GridCellBase {
    type: 'datepicker',
    options: DraymanDatepicker,
}

export interface GridTimepickerCell extends GridCellBase {
    type: 'timepicker',
    options: DraymanTimepicker,
}

export interface GridFileUploaderCell extends GridCellBase {
    type: 'file-uploader',
    options: DraymanFileUploader,
}

export interface GridSelectCell extends GridCellBase {
    type: 'select',
    options: DraymanSelect,
}

export interface GridNumberFieldCell extends GridCellBase {
    type: 'number-field',
    options: DraymanNumberField,
}

export interface GridButtonCell extends GridCellBase {
    type: 'button',
    options: DraymanButton,
}

export interface GridTextCell extends GridCellBase {
    type: 'text';
}

export type GridCellType = GridTextCell | GridTextFieldCell | GridButtonCell | GridNumberFieldCell | GridSelectCell | GridFileUploaderCell | GridCheckboxCell | GridDatepickerCell | GridTimepickerCell;
