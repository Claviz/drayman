import { Component, Input } from '@angular/core';

import { FieldBase } from '../../../../shared/components/field-base';
import { DraymanRadioGroup } from '../models/radio-group-options';

@Component({
  selector: 'drayman-radio-group-internal',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent extends FieldBase<string> {

  @Input() options?: {
    value: any;
    label: string;
  }[];
  @Input() direction?: 'column' | 'row';
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() onValueChange?: ElementEvent<{ value: string }>;
  @Input() updateOnBlur?: boolean;

}
