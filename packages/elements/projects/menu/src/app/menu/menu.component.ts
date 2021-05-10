import { Component, Input, OnInit } from '@angular/core';
import { DraymanMenu, DraymanMenuItem } from '../models/menu-options';

@Component({
  selector: 'drayman-menu-internal',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() options: DraymanMenu;

  constructor() { }

  ngOnInit() {
  }

  onItemClick(item: DraymanMenuItem) {
    if (this.options?.onItemClick) {
      this.options.onItemClick({ item });
    }
  }

}
