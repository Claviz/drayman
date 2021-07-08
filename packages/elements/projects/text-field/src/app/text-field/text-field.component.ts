import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { AutocompleteFieldBase } from 'projects/shared/components/autocomplete-field-base';

@Component({
  selector: 'drayman-text-field-internal',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent extends AutocompleteFieldBase<string> {
  @ViewChild(MatInput) input: MatInput;

  @Input() appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() onValueChange?: ElementEvent<{ value: string; }>;
  @Input() onFocus?: () => Promise<void>;
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() updateOnBlur?: boolean;
  @Input() suggestions?: {
    value: any;
    label: string;
  }[];
  @Input() suggestionsPanelWidth?: string | number;
  @Input() mask?: {
    expression?: string;
    prefix?: string;
    suffix?: string;
    emitSpecialCharacters?: boolean;
    showMaskTyped?: boolean;
    thousandSeparator?: string;
    leadZeroDateTime?: boolean;
    allowNegativeNumbers?: boolean;
  }
}

