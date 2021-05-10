import { Component, Input } from '@angular/core';
import { AutocompleteFieldBase } from 'projects/shared/components/autocomplete-field-base';

import { DraymanTextField } from '../models/text-field-options';

@Component({
  selector: 'drayman-text-field-internal',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends AutocompleteFieldBase<string> {

  @Input() options: DraymanTextField;

}

