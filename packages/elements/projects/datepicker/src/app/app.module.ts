import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxMaskModule } from 'ngx-mask';

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
    DpDatePickerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
})
export class DatepickerModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(DatepickerComponent, this.injector);
    const el = createCustomElement(DatepickerComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-datepicker', el);
  }
}