import { OverlayContainer } from '@angular/cdk/overlay';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleOverlayContainer } from 'mat-single-overlay';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, }
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(ModalComponent, { injector: this.injector, });
    customElements.define('drayman-modal', el);
  }
}