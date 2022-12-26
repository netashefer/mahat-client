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
    column: {
        chart: {
            type: 'column'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>count: {point.y}</b>'
        },
        plotOptions: {
            column: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
                showInLegend: false,
            }
        },
    },
    line: {
        chart: {
            type: 'line'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>count: {point.y}</b>'
        },
        plotOptions: {
            line: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
                showInLegend: false,
            }
        },
    },
    table: undefined,
    wordcloud: {
        chart: {
            type: 'wordcloud'
        },
        tooltip: {
            headerFormat: '<span><b>{point.key}</b></span><br>'
        },
    }
}; 