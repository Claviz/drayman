import { Component, Input, OnInit } from '@angular/core';
import { DraymanMenu, DraymanMenuItem } from '../models/menu-options';

@Component({
  selector: 'drayman-menu-internal',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() items: DraymanMenuItem[];
  @Input() onItemClick?: ({ item: DraymanMenuItem }) => Promise<void>;
  @Input() label?: string;
  @Input() view?: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'miniFab';
  @Input() icon?: string;
  @Input() tooltip?: string;
  @Input() disabled?: boolean;
  @Input() imgUrl?: string;
  @Input() buttonStyle?: any;

  constructor() { }

  ngOnInit() {
  }

}
