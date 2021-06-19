import { Injectable, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutocompleteOptionsBase } from '../models/autocomplete-options-base';

import { FieldBase } from './field-base';

@Injectable()
export class AutocompleteFieldBase<T> extends FieldBase<T> {

    suggestions?;
    onFocus?;
    filteredSuggestions: { value: any; label: any }[] = [];
    autocompleteChanges$: Subscription;

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
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
        if (this.filteredSuggestions.length === 1 && !this.filteredSuggestions[0]) {
            return { display: 'none' };
        }
        return null;
    }

    filter() {
        const filterValue = `${this.formControl.value || ''}`.toLowerCase();

        this.filteredSuggestions = this.suggestions?.filter(option => option.label?.toLowerCase()?.includes(filterValue) || '') || [];
        this.filteredSuggestions = this.filteredSuggestions.length ? this.filteredSuggestions : [null];
    }

    triggerFocus() {
        this.onFocus?.();
    }

}
