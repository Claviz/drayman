import { Component, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

import { DraymanNgxGraph } from '../models/ngx-graph-options';

@Component({
  selector: 'drayman-ngx-graph-internal',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.scss']
})
export class NgxGraphComponent implements OnChanges {

  @Input() options: DraymanNgxGraph;

  ngOnChanges() {
  }

  onResized(event: ResizedEvent) {
    window.dispatchEvent(new Event('resize'));
  }

}
