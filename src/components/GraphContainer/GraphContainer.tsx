import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import aggregatorCommunicator from '../../communication/aggregatorCommunicator';
import { graphsAtom } from '../../recoil/graphs/graphs';
import { Graph } from '../../types/graph.types';
import './GraphContainer.scss';

interface GraphContainerProps {
    data: any[];
    spec: any;
    graphId: string;
    width: number;
    height: number;
}

const GraphContainer = ({ spec, graphId, width, height }: GraphContainerProps) => {
    const graph = useRecoilValue(graphsAtom)?.find(g => g.graphId === graphId);
    const [aggregatedData, setData] = useState([]);
    const ref = useRef<HighchartsReact.RefObject>();

    useEffect(() => {
        request();// eslint-disable-next-line
    }, [graph?.dataSourceId]);

    const graphConfig: Graph["graphConfig"] = {
        x_field: "name",
        y_field: { aggragation: "sum" }
    };

    const request = async () => {
        if (graph?.dataSourceId) {
            const aggregatedData = await aggregatorCommunicator.getAggregatedData(graphConfig, graph?.dataSourceId);
            setData(aggregatedData);
        }
    };

    useEffect(() => {
        ref?.current.chart.reflow();
    }, [width, height]);

    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: graph?.title
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
        series: [{
            name: 'item',
            colorByPoint: true,
            data: aggregatedData
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={ref}
            />
        </div>
    );
};

export default GraphContainer;
