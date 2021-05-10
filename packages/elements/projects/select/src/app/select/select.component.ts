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

  @Input() options: DraymanSelect;

  searchControl: FormControl;
  searchChanges$: Subscription;
  selectOptions: { value: any; label: any }[] = [];
  searching = false;

  ngOnChanges() {
    super.ngOnChanges();
    if (this.options?.value) {
      const missingValues = this.getMissingValues(
        this.options?.options,
        Array.isArray(this.options?.value) ? this.options?.value : [this.options?.value]
      );
      this.options.options = [...missingValues.map(x => ({ value: x, label: x })), ...this.options.options];
    }
    this.selectOptions = this.options?.onSearchChange ?
      this.options?.options :
      this.options?.options?.filter(x => x.label.trim().toLowerCase().includes(this.searchControl?.value?.toLowerCase() || ''));
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
    if (this.options?.onSearchChange) {
      this.searching = true;
      this.options.onSearchChange({ value }).finally(() => this.searching = false);
    } else {
      value = value.toLowerCase();
      this.selectOptions = this.options?.options?.filter(x => x.label.trim().toLowerCase().includes(value));
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