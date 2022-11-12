import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { useEffect, useRef, useState } from 'react';
import aggregatorCommunicator from '../../communication/aggregatorCommunicator';
import { GraphOptionsMap } from '../../helpers/graph.option.helper';
import { BACKGROUND_COLOR } from '../../styles/styles.constants';
import { Graph } from '../../types/graph.types';

interface GraphContainerProps {
    graph: Graph;
    width: number;
    height: number;
}

const GraphContainer = ({ graph, width, height }: GraphContainerProps) => {
    const [aggregatedData, setData] = useState([]);
    const ref = useRef<HighchartsReact.RefObject>();

    useEffect(() => {
        fetchAggregatedData();// eslint-disable-next-line
    }, [graph?.dataSourceId]);

    const fetchAggregatedData = async () => {
        if (graph?.dataSourceId && graph?.graphConfig) {
            const aggregatedData = await aggregatorCommunicator.getAggregatedData(graph?.graphConfig, graph?.dataSourceId);
            setData(aggregatedData);
        }
    };

    useEffect(() => {
        ref?.current.chart.reflow();
    }, [width, height]);

    const options: Partial<Highcharts.Options> = {
        ...GraphOptionsMap[graph?.template?.type],
        chart: {
            backgroundColor: BACKGROUND_COLOR,
            ...GraphOptionsMap[graph?.template?.type]?.chart
        },
        title: {
            text: ""
        },
        series: [{
            name: 'item',
            data: aggregatedData,
            type: graph?.template?.type
        }],
        legend: {
            itemStyle: { color: "white" }
        }
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
