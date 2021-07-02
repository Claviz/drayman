import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import { DatePickerDirective, IDatePickerConfig } from 'ng2-date-picker';
import { FieldBase } from 'projects/shared/components/field-base';

import { DraymanDatepicker } from '../models/datepicker-options';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

@Component({
  selector: 'drayman-datepicker-internal',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends FieldBase<string> implements OnChanges {
  @ViewChild(MatInput) input: MatInput;
  @ViewChild('dateDirectivePicker') datePickerDirective: DatePickerDirective;

  @Input() dateFormat?: string;
  @Input() showTodayButton?: boolean;
  @Input() appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() onValueChange?: ElementEvent<{ value: string }>;
  @Input() updateOnBlur?: boolean;

  opened = false;
  defaultDateFormat = 'YYYY-MM-DD';
  mask;
  config: IDatePickerConfig = {
    openOnClick: false,
    openOnFocus: false,
    format: this.defaultDateFormat,
    appendTo: 'body',
    firstDayOfWeek: 'mo',
  };

  ngOnChanges(simpleChanges: SimpleChanges) {
    // todo: remove when fix will be available
    this.updateOnBlur = false;
    this.dateFormat = this.dateFormat || this.defaultDateFormat;
    if (this.config.format !== this.dateFormat) {
      this.config = {
        ...this.config,
        format: this.dateFormat,
      };
    }
    if (this.value) {
      this.value = dayjs.utc(this.value).format(this.config.format);
    }
    const format = this.config.format;
    this.mask = format?.length === 10 && ['YYYY', 'MM', 'DD'].every(x => format.includes(x)) ?
      format.replace('YYYY', '0000').replace('MM', 'M0').replace('DD', 'd0') : null;
    super.ngOnChanges(simpleChanges);
  }

  setTodayDate() {
    this.formControl.setValue(dayjs.utc().format(this.config.format));
  }

  modifyValueBeforeChange(value) {
    return this.getISOString(value);
  }

  shouldValueChange(value) {
    if (!value) {
      return true;
    }
    try {
      this.getISOString(value);
    } catch (err) {
      return false;
    }
    return true;
  }

  toggleOpen() {
    this.opened ? this.datePickerDirective.api.close() : this.datePickerDirective.api.open();
  }

  getISOString(value) {
    if (!value) {
      return null;
    }
    return dayjs(value, this.config.format, 'en', true).utc(true).startOf('day').toISOString();
  }

}

