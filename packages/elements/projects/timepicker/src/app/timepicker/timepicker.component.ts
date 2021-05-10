import { Component, Input, OnChanges } from '@angular/core';
import { FieldBase } from 'projects/shared/components/field-base';

import { DraymanTimepicker } from '../models/timepicker-options';

@Component({
  selector: 'drayman-timepicker-internal',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent extends FieldBase<string> implements OnChanges {
  @Input() options: DraymanTimepicker;

  ngOnChanges() {
    if (this.options) {
      this.options.updateOnBlur = false;
    }
    super.ngOnChanges();
  }

  setCurrentTime() {
    const now = new Date();
    const h = now.getHours();
    const hh = `${h < 10 ? '0' : ''}${h}`;
    const m = now.getMinutes();
    const mm = `${m < 10 ? '0' : ''}${m}`;

    this.formControl.setValue(`${hh}:${mm}`);
  }

  shouldValueChange(value) {
    if (!value) {
      return true;
    }
    const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return value.match(timeReg);
  }
}

