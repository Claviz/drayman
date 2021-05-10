import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [TextFieldComponent],
  exports: [TextFieldComponent],
})
export class TextFieldModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(TextFieldComponent, this.injector);
    const el = createCustomElement(TextFieldComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-text-field', el);
  }
}