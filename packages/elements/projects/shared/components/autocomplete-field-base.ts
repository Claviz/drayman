import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutocompleteOptionsBase } from '../models/autocomplete-options-base';

import { FieldBase } from './field-base';

@Injectable()
export class AutocompleteFieldBase<T> extends FieldBase<T> {

    options: AutocompleteOptionsBase<T>;
    suggestions: { value: any; label: any }[] = [];
    autocompleteChanges$: Subscription;

    ngOnChanges() {
        super.ngOnChanges();
        this.filter();
    }

    ngOnInit() {
        super.ngOnInit();
        this.autocompleteChanges$ = this.formControl.valueChanges
            .subscribe(() => this.filter());
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.autocompleteChanges$) {
            this.autocompleteChanges$.unsubscribe();
        }
    }

    get suggestionStyle() {
        if (this.suggestions.length === 1 && !this.suggestions[0]) {
            return { display: 'none' };
        }
        return null;
    }

    filter() {
        const filterValue = `${this.formControl.value || ''}`.toLowerCase();

        this.suggestions = this.options?.suggestions?.filter(option => option.label?.toLowerCase()?.includes(filterValue) || '') || [];
        this.suggestions = this.suggestions.length ? this.suggestions : [null];
    }

    onFocus() {
        this.options?.onFocus?.();
    }

}
