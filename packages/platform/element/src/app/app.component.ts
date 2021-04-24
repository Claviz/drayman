import '@drayman/element/dist/main-es2015';
import { Component, Input } from '@angular/core';
import { ConnectionService } from './connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() component?: string;
  @Input() options: any;

  constructor(public connectionService: ConnectionService) {

  }
}
