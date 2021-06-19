import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { generateContainerChart } from 'claviz-charts';
import { ContainerChartLine, ContainerChartOptions } from 'claviz-charts/lib/models/container-chart-options';

@Component({
  selector: 'drayman-claviz-charts-internal',
  templateUrl: './claviz-charts.component.html',
  styleUrls: ['./claviz-charts.component.scss'],
})
export class ClavizChartsComponent implements OnChanges, AfterViewInit {

  @Input() padding?: number;
  @Input() data: ContainerChartLine[];
  @Input() reversed?: boolean;
  @Input() orientation?: 'horizontal' | 'vertical';
  @Input() verticalTextTopDown?: boolean;
  @Input() onClick?: (data: any) => ElementEvent<void>;

  @ViewChild('wrapper', { static: false }) wrapper;

  changeChartOptions;

  constructor() { }

  ngOnChanges() {
    this.changeChartOptions?.(this.options);
  }

  ngAfterViewInit() {
    this.changeChartOptions = generateContainerChart(
      this.wrapper.nativeElement,
      this.options,
    );
  }

  get options() {
    const options: ContainerChartOptions = { data: this.data || [] };
    if (this.orientation) { options.orientation = this.orientation };
    if (this.padding) { options.padding = this.padding };
    if (this.reversed) { options.reversed = this.reversed };
    if (this.verticalTextTopDown) { options.verticalTextTopDown = this.verticalTextTopDown };
    if (this.onClick) { options.select = this.onClick };

    return options
  }

}