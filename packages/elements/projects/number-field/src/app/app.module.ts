import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { NumberFieldComponent } from './number-field/number-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SingleOverlayContainer } from 'mat-single-overlay';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  declarations: [NumberFieldComponent],
  exports: [NumberFieldComponent],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, },
  ],
})
export class NumberFieldModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(NumberFieldComponent, this.injector);
    const el = createCustomElement(NumberFieldComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-number-field', el);
  }
}