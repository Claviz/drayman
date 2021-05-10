import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(CheckboxComponent, this.injector);
    const el = createCustomElement(CheckboxComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-checkbox', el);
  }
}