import { LazyElementsModule } from '@angular-extensions/elements';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
// import { AppComponent } from './app.component';

import { DraymanElementComponent } from './drayman-element.component';
import { DraymanInputFieldComponent } from './input-field/drayman-input-field.component';
import { DraymanModalComponent } from './modal/drayman-modal.component';
import { SingleOverlayContainer } from 'mat-single-overlay';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LazyElementsModule,
    MatDialogModule,
    MatSnackBarModule,
    ClipboardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // AppComponent,
    DraymanElementComponent,
    DraymanModalComponent,
    DraymanInputFieldComponent,
  ],
  providers: [
    { provide: OverlayContainer, useClass: SingleOverlayContainer }
  ],
  bootstrap: [],
  entryComponents: [DraymanElementComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const elm = createCustomElement(DraymanElementComponent, { injector: this.injector, });
    customElements.define('drayman-element', elm);
  }

}