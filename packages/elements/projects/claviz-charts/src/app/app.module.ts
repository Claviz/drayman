import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { ClavizChartsComponent } from './claviz-charts/claviz-charts.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [ClavizChartsComponent],
  entryComponents: [ClavizChartsComponent],
})
export class ClavizChartsModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(ClavizChartsComponent, this.injector);
    const el = createCustomElement(ClavizChartsComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-claviz-charts', el);
  }
}