import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SelectComponent } from './select/select.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SingleOverlayContainer } from 'mat-single-overlay';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, }
  ]
})
export class SelectModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(SelectComponent, this.injector);
    const el = createCustomElement(SelectComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-select', el);
  }
}