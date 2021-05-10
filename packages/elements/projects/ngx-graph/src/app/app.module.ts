import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { NgxGraphComponent } from './ngx-graph/ngx-graph.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgxGraphModule,
    AngularResizedEventModule,
  ],
  declarations: [NgxGraphComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(NgxGraphComponent, this.injector);
    const el = createCustomElement(NgxGraphComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-ngx-graph', el);
  }
}