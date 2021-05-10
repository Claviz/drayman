import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { ButtonModule } from 'projects/button/src/app/app.module';
import { MatMenuModule } from '@angular/material/menu';

import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: [MenuComponent, MenuItemComponent],
})
export class MenuModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(MenuComponent, this.injector);
    const el = createCustomElement(MenuComponent, { injector: this.injector, strategyFactory });
    customElements.define('drayman-menu', el);
  }
}