import { Component, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

import { DraymanNgxGraph } from '../models/ngx-graph-options';

@Component({
  selector: 'drayman-ngx-graph-internal',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.scss']
})
export class NgxGraphComponent implements OnChanges {

  @Input() links?: any[];
  @Input() nodes?: any[];
  @Input() clusters?: any;
  @Input() showMiniMap?: boolean;
  @Input() draggingEnabled?: boolean;
  @Input() autoCenter?: boolean;
  @Input() autoZoom?: boolean;

  ngOnChanges() {
  }

  onResized(event: ResizedEvent) {
    window.dispatchEvent(new Event('resize'));
  }

}
