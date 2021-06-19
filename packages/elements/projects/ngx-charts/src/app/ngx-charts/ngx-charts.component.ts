import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { TooltipService } from '@swimlane/ngx-charts';
import { ResizedEvent } from 'angular-resize-event';

import { DraymanNgxCharts } from '../models/ngx-charts-options';

@Component({
  selector: 'drayman-ngx-charts-internal',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})
export class NgxChartsComponent implements OnChanges, AfterViewInit {

  @ViewChild('chartContainer', { read: ViewContainerRef, static: true }) public chartContainer: ViewContainerRef;
  @Input() onSelect?: (data: any) => Promise<void>;;
  @Input() type: 'pie' | 'verticalBar' | 'numberCard' | 'gauge' | 'areaNormalized' | 'areaStacked' | 'line';
  @Input() results: any[];
  @Input() legendTitle?: string;
  @Input() scheme?: any;
  @Input() animations?: boolean;
  @Input() legend?: boolean;
  @Input() labels?: boolean;
  @Input() customColors?: any;
  @Input() schemeType?: 'ordinal' | 'linear';
  @Input() explodeSlices?: boolean;
  @Input() doughnut?: boolean;
  @Input() arcWidth?: number;
  @Input() gradient?: boolean;
  @Input() activeEntries?: any[];
  @Input() tooltipDisabled?: boolean;
  @Input() trimLabels?: boolean;
  @Input() maxLabelLength?: number;
  @Input() xAxis?: boolean;
  @Input() yAxis?: boolean;
  @Input() showXAxisLabel?: boolean;
  @Input() showYAxisLabel?: boolean;
  @Input() xAxisLabel?: string;
  @Input() yAxisLabel?: string;
  @Input() showGridLines?: boolean;
  @Input() xAxisTicks?: boolean;
  @Input() yAxisTicks?: boolean;
  @Input() barPadding?: number;
  @Input() roundDomains?: boolean;
  @Input() roundEdges?: boolean;
  @Input() yScaleMax?: number;
  @Input() yScaleMin?: number;
  @Input() showDataLabel?: boolean;
  @Input() cardColor?: string;
  @Input() bandColor?: string;
  @Input() emptyColor?: string;
  @Input() innerPadding?: number | number[];
  @Input() textColor?: string;
  @Input() legendPosition?: 'right' | 'below';
  @Input() min?: number;
  @Input() max?: number;
  @Input() units?: string;
  @Input() bigSegments?: number;
  @Input() smallSegments?: number;
  @Input() showAxis?: boolean;
  @Input() startAngle?: number;
  @Input() angleSpan?: number;
  @Input() timeline?: boolean;
  @Input() xScaleMin?: any;
  @Input() xScaleMax?: any;
  @Input() autoScale?: boolean;
  @Input() rangeFillOpacity?: number;
  @Input() showRefLines?: boolean;
  @Input() referenceLines?: any[];
  @Input() showRefLabels?: boolean;

  chart: DraymanNgxCharts;

  constructor(private elementRef: ElementRef, private tooltipService: TooltipService) { }

  ngAfterViewInit() {
    this.tooltipService.injectionService.setRootViewContainer(this.chartContainer);
  }

  onResized(event: ResizedEvent) {
    window.dispatchEvent(new Event('resize'));
  }

  ngOnChanges() {
    this.chart = {
      type: this.type,
      results: this.results,
      legendTitle: this.legendTitle || 'Legend',
      scheme: this.scheme || 'cool',
      animations: this.animations || true,
      legend: this.legend || false,
      labels: this.labels || false,
      customColors: this.customColors || undefined,
      schemeType: this.schemeType || 'ordinal',
      explodeSlices: this.explodeSlices || false,
      doughnut: this.doughnut || false,
      arcWidth: this.arcWidth || 0.25,
      gradient: this.gradient || false,
      activeEntries: this.activeEntries || [],
      tooltipDisabled: this.tooltipDisabled || false,
      trimLabels: this.trimLabels || true,
      maxLabelLength: this.maxLabelLength || 10,
      xAxis: this.xAxis || undefined,
      yAxis: this.yAxis || undefined,
      showXAxisLabel: this.showXAxisLabel || undefined,
      showYAxisLabel: this.showYAxisLabel || undefined,
      xAxisLabel: this.xAxisLabel || undefined,
      yAxisLabel: this.yAxisLabel || undefined,
      showGridLines: this.showGridLines || true,
      xAxisTicks: this.xAxisTicks || undefined,
      yAxisTicks: this.yAxisTicks || undefined,
      barPadding: this.barPadding || 8,
      roundDomains: this.roundDomains || false,
      roundEdges: this.roundEdges || true,
      yScaleMax: this.yScaleMax || undefined,
      yScaleMin: this.yScaleMin || undefined,
      showDataLabel: this.showDataLabel || false,
      cardColor: this.cardColor || undefined,
      bandColor: this.bandColor || undefined,
      emptyColor: this.emptyColor || 'rgba(0, 0, 0, 0)',
      innerPadding: this.innerPadding || 15,
      textColor: this.textColor || undefined,
      legendPosition: this.legendPosition || 'right',
      min: this.min || 0,
      max: this.max || 100,
      units: this.units || undefined,
      bigSegments: this.bigSegments || 10,
      smallSegments: this.smallSegments || 5,
      showAxis: this.showAxis || true,
      startAngle: this.startAngle || -120,
      angleSpan: this.angleSpan || 240,
      timeline: this.timeline || undefined,
      xScaleMin: this.xScaleMin || undefined,
      xScaleMax: this.xScaleMax || undefined,
      autoScale: this.autoScale || undefined,
      rangeFillOpacity: this.rangeFillOpacity || undefined,
      showRefLines: this.showRefLines || false,
      referenceLines: this.referenceLines || undefined,
      showRefLabels: this.showRefLabels || true,
    };
  }

}
