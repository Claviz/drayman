import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FieldBase } from '../../../../../projects/shared/components/field-base';
import { DraymanSelect } from '../models/select-options';

@Component({
  selector: 'drayman-select-internal',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldBase<any> {

  @Input() options?: {
    value: any;
    label: string;
  }[];
  @Input() onSearchChange?: (data: { value: string }) => Promise<void>;
  @Input() multiple?: boolean;
  @Input() value?: any;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() placeholder?: string;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() onValueChange?: ElementEvent<{ value: any }>;
  @Input() updateOnBlur?: boolean;

  searchControl: FormControl;
  searchChanges$: Subscription;
  selectOptions: { value: any; label: any }[] = [];
  searching = false;

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (this.value) {
      const missingValues = this.getMissingValues(
        this.options,
        Array.isArray(this.value) ? this.value : [this.value]
      );
      this.options = [...missingValues.map(x => ({ value: x, label: x })), ...this.options];
    }
    this.selectOptions = this.onSearchChange ?
      this.options :
      this.options?.filter(x => `${x.label}`.trim().toLowerCase().includes(this.searchControl?.value?.toLowerCase() || ''));
  }

  clearSelection($event) {
    $event.stopPropagation();
    this.formControl.setValue(undefined);
  }

  ngOnInit() {
    super.ngOnInit();
    this.searchControl = new FormControl('');
    this.searchChanges$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((value) => this.search(value));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.searchChanges$) {
      this.searchChanges$.unsubscribe();
    }
  }

  search(value: string = '') {
    if (this.onSearchChange) {
      this.searching = true;
      this.onSearchChange({ value }).finally(() => this.searching = false);
    } else {
      value = value.toLowerCase();
      this.selectOptions = this.options?.filter(x => x.label.trim().toLowerCase().includes(value));
    }
  }

  getMissingValues(options: { value: any; label: any }[], missingCandidates: any[]) {
    const missingValues = [];
    if (options) {
      for (const candidate of missingCandidates) {
        if (candidate && !options.find(x => x.value === candidate)) {
          missingValues.push(candidate);
        }
      }
    }
    return missingValues;
  }

  trackByFn(index, item) {
    return item.value;
  }

}