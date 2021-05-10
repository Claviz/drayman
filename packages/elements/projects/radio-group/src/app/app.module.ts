import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { RadioGroupComponent } from './radio-group/radio-group.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  declarations: [RadioGroupComponent],
})
export class RadioGroupModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(RadioGroupComponent, this.injector);
    const el = createCustomElement(RadioGroupComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-radio-group', el);
  }
}