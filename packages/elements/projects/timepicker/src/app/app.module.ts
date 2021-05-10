import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgxMaskModule } from 'ngx-mask';

import { TimepickerComponent } from './timepicker/timepicker.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [TimepickerComponent],
  declarations: [TimepickerComponent],
})
export class TimepickerModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(TimepickerComponent, this.injector);
    const el = createCustomElement(TimepickerComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-timepicker', el);
  }
}