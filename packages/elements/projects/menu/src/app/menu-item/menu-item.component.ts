import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DraymanMenuItem } from '../models/menu-options';

@Component({
  selector: 'drayman-menu-item-internal',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() items: DraymanMenuItem[] = [];
  @Output() itemClick = new EventEmitter();
  @ViewChild('childMenu', { static: true }) public childMenu: any;

  constructor() { }

  ngOnInit() {
  }

}
