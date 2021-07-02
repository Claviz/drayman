import { OnChanges, OnInit, SimpleChanges, OnDestroy, Injectable, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { FieldOptionsBase } from '../models/field-options-base';

@Injectable()
export class FieldBase<T> implements OnChanges, OnDestroy, OnInit {

    input: MatInput;
    errorStateMatcher: ErrorStateMatcher = { isErrorState: () => !!this.error || (!this.valueCanBeChanged && this.formControl.dirty) };
    formControl = new FormControl('');
    error?;
    value?;
    // onValueChangeStart?;
    onValueChange?;
    updateOnBlur?;
    disabled?;
    private valueChanges$: Subscription;
    // private debouncing = false;
    // private debounce = 500;
    // private pendingRequests = 0;
    private valueCanBeChanged = false;
    private formValue;

    constructor() { }

    ngOnInit() {
        this.valueChanges$ = this.formControl.valueChanges.pipe(
            filter((value) => {
                this.valueCanBeChanged = this.shouldValueChange(value);
                let optionsValue = this.value || null;
                this.formValue = value || null;
                return optionsValue !== this.formValue && this.valueCanBeChanged;
            }),
            // tap(() => {
            //     if (!this.debouncing && this.onValueChangeStart) {
            //         this.onValueChangeStart();
            //     }
            //     this.debouncing = true;
            // }),
            // debounceTime(this.debounce),
        ).subscribe(() => {
            if (!this.updateOnBlur) {
                this.triggerValueChange(this.formValue);
            }
        });
    }

    triggerValueChange(value) {
        if (this.onValueChange) {
            // this.debouncing = false;
            // this.pendingRequests++;
            this.onValueChange({ value: this.modifyValueBeforeChange(value) })
            // .then(() => this.pendingRequests--);
        }
    }

    onBlur() {
        if (this.updateOnBlur && this.shouldValueChange(this.formControl.value)) {
            this.triggerValueChange(this.formControl.value);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.disabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
        // if (!this.debouncing && this.pendingRequests === 0) {
        if (changes.value && !this.input?.focused) {
            this.formControl.setValue(this.value, { emitEvent: false });
        }
        // }
    }

    modifyValueBeforeChange(value: any): T {
        return value;
    }

    shouldValueChange(value: any): boolean {
        return true;
    }

    ngOnDestroy() {
        if (this.valueChanges$) {
            this.valueChanges$.unsubscribe();
        }
    }

}
