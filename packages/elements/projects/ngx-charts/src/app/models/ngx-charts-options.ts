export interface DraymanNgxCharts {
    /**
     * Executed when user interacts with the chart.
     * Emits data defined by `onSelect` output of [ngx-charts](https://github.com/swimlane/ngx-charts) library.
     */
    onSelect?: ElementEvent<{ data: any }>;
    type: 'pie' | 'verticalBar' | 'numberCard' | 'gauge' | 'areaNormalized' | 'areaStacked' | 'line';
    /**
     * Chart data.
     */
    results: any[];
    legendTitle?: string;
    /**
     * Color scheme of the chart.
     */
    scheme?: any;
    /**
     * Enable animations.
     */
    animations?: boolean;
    /**
     * Show or hide legend.
     */
    legend?: boolean;
    /**
     * Show or hide lables.
     */
    labels?: boolean;
    /**
     * Custom colors for the chart. Used to override a color for a specific value.
     */
    customColors?: any;
    /**
     * Color scale type.
     */
    schemeType?: 'ordinal' | 'linear';
    /**
     * Make the radius of each slice proportional to it's value.
     */
    explodeSlices?: boolean;
    /**
     * Show doughnut instead of pie slices.
     */
    doughnut?: boolean;
    /**
     * Arc width, expressed as a fraction of outer radius.
     */
    arcWidth?: number;
    /**
     * Fill elements with a gradient instead of a solid color.
     */
    gradient?: boolean;
    /**
     * Elements to highlight.
     */
    activeEntries?: any[];
    tooltipDisabled?: boolean;
    trimLabels?: boolean;
    /**
     * Maximum length of the labels. If `trimLabels` is `true`, labels over this length will be trimmed.
     */
    maxLabelLength?: number;
    /**
     * Show or hide the x axis.
     */
    xAxis?: boolean;
    /**
    * Show or hide the y axis.
    */
    yAxis?: boolean;
    /**
    * Show or hide the x axis label.
    */
    showXAxisLabel?: boolean;
    /**
    * Show or hide the y axis label.
    */
    showYAxisLabel?: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    showGridLines?: boolean;
    /**
     * Trim or don't trim ticks on the x axis.
     */
    xAxisTicks?: boolean;
    /**
    * Trim or don't trim ticks on the y axis.
    */
    yAxisTicks?: boolean;
    /**
     * Padding between bars in `px`.
     */
    barPadding?: number;
    /**
     * Round domains for aligned gridlines.
     */
    roundDomains?: boolean;
    roundEdges?: boolean;
    /**
     * Maximum value of the y axis (ignored if chart data contains a higher value)
     */
    yScaleMax?: number;
    /**
    * Minimum value of the y axis (ignored if chart data contains a lower value)
    */
    yScaleMin?: number;
    /**
     * Display value number next to the bar.
     */
    showDataLabel?: boolean;
    /**
     * Color of the card background, defaults to color based on value and scheme.
     */
    cardColor?: string;
    /**
     * Color of the card color-bar, defaults to color based on value and scheme.
     */
    bandColor?: string;
    /**
     * Color of empty card slots.
     */
    emptyColor?: string;
    /**
     * Padding around each card in `px`.
     */
    innerPadding?: number | number[];
    /** 
     * Color of the card text, defaults to the inverse of the card color.
     */
    textColor?: string;
    legendPosition?: 'right' | 'below';
    /**
     * Starting point of the scale.
     */
    min?: number;
    /**
    * Ending point of the scale.
    */
    max?: number;
    /**
     * Text to display under the value.
     */
    units?: string;
    /**
     * Number of big segments on the axis.
     */
    bigSegments?: number;
    /**
    * Number of small segments between every big segment.
    */
    smallSegments?: number;
    showAxis?: boolean;
    /**
     * The angle that the chart is rotated by. Use negative half of the spanning angle to centralize.
     */
    startAngle?: number;
    /**
     * The angle that the chart spans (in degrees).
     */
    angleSpan?: number;
    /**
     * Display a timeline control under the chart. Only available if x scale is date.
     */
    timeline?: boolean;
    /**
     * The minimum value of the x axis (if the x scale is linear or time).
     */
    xScaleMin?: any;
    /**
     * The maximum value of the x axis (if the x scale is linear or time).
     */
    xScaleMax?: any;
    /**
     * Set the minimum value of the y axis to the minimum value in the data, instead of 0 (ignored if yScaleMin is defined).
     */
    autoScale?: boolean;
    /**
     * Opacity of the shadow around the line indication the (optional) min and max values. 
     * The range shadow is only displayed if min and max values are provided with the data. 
     * The color of the shadow is alwas the color of the central line.
     */
    rangeFillOpacity?: number;
    showRefLines?: boolean;
    /**
     * An array of reference lines to be shown behind the chart. Every reference line should be of format `{name, value}`.
     */
    referenceLines?: any[];
    showRefLabels?: boolean;
}
