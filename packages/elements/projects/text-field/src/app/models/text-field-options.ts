import { InputMaskOptionsBase } from '../../../../shared/models/input-mask-options-base';
import { AutocompleteOptionsBase } from '../../../../shared/models/autocomplete-options-base';
import { InputFieldOptionsBase } from '../../../../shared/models/input-field-options-base';

export interface DraymanTextField extends InputFieldOptionsBase<string>, AutocompleteOptionsBase<string>, InputMaskOptionsBase {
}
