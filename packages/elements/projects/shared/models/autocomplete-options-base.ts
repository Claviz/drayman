import { InputFieldOptionsBase } from "./input-field-options-base";

export interface AutocompleteOptionsBase<T> extends InputFieldOptionsBase<T> {
    /**
     * Autocomplete suggestions.
     */
    suggestions?: {
        value: any;
        label: string;
    }[];
    /**
     * Executed when autocomplete field is focused.
     */
    onFocus?: ElementEvent<{}>;
    /**
     * Specify the width of the autocomplete panel. Can be any CSS sizing value, otherwise it will match the width of its host.
     */
    suggestionsPanelWidth?: string | number;
}