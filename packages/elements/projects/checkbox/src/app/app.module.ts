import { OverlayContainer } from '@angular/cdk/overlay';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleOverlayContainer } from 'mat-single-overlay';

import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer, },
  ],
})
export class CheckboxModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(CheckboxComponent, { injector: this.injector });
    customElements.define('drayman-checkbox', el);
  }
}