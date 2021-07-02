import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldBase } from 'projects/shared/components/field-base';
import { DraymanTextareaField } from '../models/textarea-field-options';

@Component({
  selector: 'drayman-textarea-field-internal',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FieldBase<string> {
  @ViewChild(MatInput) input: MatInput;

  @Input() rows?: number;
  @Input() appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() onValueChange?: ElementEvent<{ value: string }>;
  @Input() updateOnBlur?: boolean;

}
