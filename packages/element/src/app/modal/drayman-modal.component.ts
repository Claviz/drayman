import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-drayman-modal',
  templateUrl: './drayman-modal.component.html',
  styleUrls: ['./drayman-modal.component.scss']
})
export class DraymanModalComponent {
  @Input() component?: string;
  @Input() options: any;
  @Input() config: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData) {
      this.component = dialogData.component;
      this.config = dialogData.config;
      this.options = dialogData.options;
    }
  }
}
