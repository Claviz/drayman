import { Component, Input } from '@angular/core';

import { FieldBase } from '../../../../shared/components/field-base';
import { DraymanRadioGroup } from '../models/radio-group-options';

@Component({
  selector: 'drayman-radio-group-internal',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent extends FieldBase<string> {

  @Input() options: DraymanRadioGroup;

}
