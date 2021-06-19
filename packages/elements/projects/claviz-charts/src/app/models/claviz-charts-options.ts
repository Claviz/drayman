import { ContainerChartOptions } from 'claviz-charts/lib/models/container-chart-options';

export interface DraymanClavizCharts extends ContainerChartOptions {
    /**
     * Function that will be executed when user clicks a chart element.
     */
    onClick?: (data: any) => ElementEvent<void>;
    /**
     * @ignore
     */
    select?: never;
}