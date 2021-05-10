import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AngularResizedEventModule,
  ],
  declarations: [NgxChartsComponent],
  entryComponents: [NgxChartsComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(NgxChartsComponent, this.injector);
    const el = createCustomElement(NgxChartsComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-ngx-charts', el);
  }
}