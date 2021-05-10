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
  @Input() options: DraymanNgxCharts;

  chart: DraymanNgxCharts;

  constructor(private elementRef: ElementRef, private tooltipService: TooltipService) { }

  ngAfterViewInit() {
    this.tooltipService.injectionService.setRootViewContainer(this.chartContainer);
  }

  onSelect($event) {
    if (this.options?.onSelect) {
      this.options.onSelect($event);
    }
  }

  onResized(event: ResizedEvent) {
    window.dispatchEvent(new Event('resize'));
  }

  ngOnChanges() {
    if (this.options) {
      this.chart = {
        ...this.options,
        legendTitle: this.options?.legendTitle || 'Legend',
        scheme: this.options?.scheme || 'cool',
        animations: this.options?.animations || true,
        legend: this.options?.legend || false,
        labels: this.options?.labels || false,
        customColors: this.options?.customColors || undefined,
        schemeType: this.options?.schemeType || 'ordinal',
        explodeSlices: this.options?.explodeSlices || false,
        doughnut: this.options?.doughnut || false,
        arcWidth: this.options?.arcWidth || 0.25,
        gradient: this.options?.gradient || false,
        activeEntries: this.options?.activeEntries || [],
        tooltipDisabled: this.options?.tooltipDisabled || false,
        trimLabels: this.options?.trimLabels || true,
        maxLabelLength: this.options?.maxLabelLength || 10,
        xAxis: this.options?.xAxis || undefined,
        yAxis: this.options?.yAxis || undefined,
        showXAxisLabel: this.options?.showXAxisLabel || undefined,
        showYAxisLabel: this.options?.showYAxisLabel || undefined,
        xAxisLabel: this.options?.xAxisLabel || undefined,
        yAxisLabel: this.options?.yAxisLabel || undefined,
        showGridLines: this.options?.showGridLines || true,
        xAxisTicks: this.options?.xAxisTicks || undefined,
        yAxisTicks: this.options?.yAxisTicks || undefined,
        barPadding: this.options?.barPadding || 8,
        roundDomains: this.options?.roundDomains || false,
        roundEdges: this.options?.roundEdges || true,
        yScaleMax: this.options?.yScaleMax || undefined,
        yScaleMin: this.options?.yScaleMin || undefined,
        showDataLabel: this.options?.showDataLabel || false,
        cardColor: this.options?.cardColor || undefined,
        bandColor: this.options?.bandColor || undefined,
        emptyColor: this.options?.emptyColor || 'rgba(0, 0, 0, 0)',
        innerPadding: this.options?.innerPadding || 15,
        textColor: this.options?.textColor || undefined,
        legendPosition: this.options?.legendPosition || 'right',
        min: this.options?.min || 0,
        max: this.options?.max || 100,
        units: this.options?.units || undefined,
        bigSegments: this.options?.bigSegments || 10,
        smallSegments: this.options?.smallSegments || 5,
        showAxis: this.options?.showAxis || true,
        startAngle: this.options?.startAngle || -120,
        angleSpan: this.options?.angleSpan || 240,
        timeline: this.options?.timeline || undefined,
        xScaleMin: this.options?.xScaleMin || undefined,
        xScaleMax: this.options?.xScaleMax || undefined,
        autoScale: this.options?.autoScale || undefined,
        rangeFillOpacity: this.options?.rangeFillOpacity || undefined,
        showRefLines: this.options?.showRefLines || false,
        referenceLines: this.options?.referenceLines || undefined,
        showRefLabels: this.options?.showRefLabels || true,
      };
    }
  }

}
