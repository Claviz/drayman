import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { Attributes, IntersectionObserverHooks, LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPopperModule } from 'ngx-popper';

import { ButtonComponent } from './button/button.component';

class LazyLoadImageHooks extends IntersectionObserverHooks {
  async loadImage({ imagePath }: Attributes): Promise<string> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    if (blob.size) {
      const url = URL.createObjectURL(blob);
      return url;
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    NgxPopperModule.forRoot({
      disableDefaultStyling: true,
      applyArrowClass: 'hidden',
      showDelay: 500,
      trigger: 'hover',
      hideOnClickOutside: false,
      styles: {
        position: 'relative',
        background: '#fff',
        padding: '5px 5px 0 5px',
        'z-index': '1001',
        'border-radius': '2px',
        'box-shadow': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      },
      placement: 'right',
    }),
    LazyLoadImageModule,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(ButtonComponent, this.injector);
    const el = createCustomElement(ButtonComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-button', el);
  }
}