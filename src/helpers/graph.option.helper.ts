import { GraphType } from "../types/graph.types";

export const GraphOptionsMap: Record<GraphType, Highcharts.Options> = {
    pie: {
        chart: {
            type: 'pie'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>count: {point.y}, percentage: {point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}'
                },
                showInLegend: true
            }
        },
    },

    column: {},
    line: {}
}; 