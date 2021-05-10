import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { generateContainerChart } from 'claviz-charts';

import { DraymanClavizCharts } from '../models/claviz-charts-options';

@Component({
  selector: 'drayman-claviz-charts-internal',
  templateUrl: './claviz-charts.component.html',
  styleUrls: ['./claviz-charts.component.scss'],
})
export class ClavizChartsComponent implements OnChanges, AfterViewInit {

  @Input() options: DraymanClavizCharts;

  @ViewChild('wrapper', { static: false }) wrapper;

  changeChartOptions;

  constructor() { }

  ngOnChanges() {
    if (this.changeChartOptions) {
      this.changeChartOptions({
        ...this.options,
        select: this.onSelect,
      });
    }
  }

  ngAfterViewInit() {
    this.changeChartOptions = generateContainerChart(
      this.wrapper.nativeElement,
      {
        ...this.options,
        select: this.onSelect,
        data: this.options?.data || [],
      }
    );
  }

  onSelect = ($event) => {
    if (this.options?.onClick) {
      this.options?.onClick($event);
    }
  }

}