import { OverlayContainer } from '@angular/cdk/overlay';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { SingleOverlayContainer } from 'mat-single-overlay';

import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    AngularResizedEventModule,
  ],
  declarations: [YoutubePlayerComponent],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, },
  ],
})
export class DraymanYoutubePlayerModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(YoutubePlayerComponent, this.injector);
    const el = createCustomElement(YoutubePlayerComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-youtube-player', el);
  }
}