import { OverlayContainer } from '@angular/cdk/overlay';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleOverlayContainer } from 'mat-single-overlay';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, }
  ],
  declarations: [SnackBarComponent],
  exports: [SnackBarComponent],
})
export class SnackBarModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(SnackBarComponent, { injector: this.injector, });
    customElements.define('drayman-snack-bar', el);
  }
}