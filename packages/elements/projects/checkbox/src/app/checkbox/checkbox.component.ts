import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FieldBase } from '../../../../shared/components/field-base';
import { DraymanCheckbox } from '../models/checkbox-options';
import { generate } from 'shortid';

@Component({
  selector: 'drayman-checkbox-internal',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FieldBase<boolean> implements OnChanges {

  @Input() options: DraymanCheckbox;
  id = generate();

  //todo: remove when fix will be available
  ngOnChanges() {
    if (this.options) {
      this.options.updateOnBlur = false;
    }
    super.ngOnChanges();
  }
}
