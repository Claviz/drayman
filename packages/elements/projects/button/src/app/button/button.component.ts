import { Component, Input } from '@angular/core';
import { DraymanButton } from 'projects/shared/models/button-options';

@Component({
  selector: 'drayman-button-internal',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() options: DraymanButton;

  onClick() {
    if (this.options?.onClick) {
      this.options.onClick();
    }
  }
}
