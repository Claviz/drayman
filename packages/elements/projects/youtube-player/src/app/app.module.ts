import { OverlayContainer } from '@angular/cdk/overlay';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AngularResizedEventModule } from 'angular-resize-event';
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
    const el = createCustomElement(YoutubePlayerComponent, { injector: this.injector, });
    customElements.define('drayman-youtube-player', el);
  }
}