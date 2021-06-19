import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { DraymanPdfViewer } from '../models/pdf-viewer-options';

@Component({
  selector: 'drayman-pdf-viewer-internal',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  @Input() src: string;
  @Input() page?: number;

  @ViewChild('wrapper', { static: false }) wrapper;

  loaded = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.width || changes.height && this.loaded) {
    //   this.wrapper.render();
    // }
  }

}
