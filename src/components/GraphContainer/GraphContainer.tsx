import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import aggregatorCommunicator from '../../communication/aggregatorCommunicator';
import { GraphOptionsMap } from '../../helpers/graph.option.helper';
import { graphsAtom } from '../../recoil/graphs/graphs';
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

    const request = async () => {
        if (graph?.dataSourceId && graph?.graphConfig) {
            const aggregatedData = await aggregatorCommunicator.getAggregatedData(graph?.graphConfig, graph?.dataSourceId);
            setData(aggregatedData);
        }
    };

    useEffect(() => {
        ref?.current.chart.reflow();
    }, [width, height]);

    const options = {
        title: {
            text: graph?.title
        },
        series: [{
            name: 'item',
            colorByPoint: true,
            data: aggregatedData
        }],
        ...GraphOptionsMap[graph?.template?.type],
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
