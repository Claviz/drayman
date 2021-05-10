import { Component, Input, OnInit } from '@angular/core';
import { FieldBase } from 'projects/shared/components/field-base';
import { DraymanTextareaField } from '../models/textarea-field-options';

@Component({
  selector: 'drayman-textarea-field-internal',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FieldBase<string> {

  @Input() options: DraymanTextareaField;

}
