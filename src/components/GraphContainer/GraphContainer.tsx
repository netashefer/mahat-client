import { useEffect, useState } from 'react';
import aggregatorCommunicator from '../../communication/aggregatorCommunicator';
import { Graph, GraphType } from '../../types/graph.types';
import { PartialRecord } from '../../types/utility.types';
import { GraphHandler } from '../WidgetContainer/WidgetContainer';
import HighchartsGraph from './HighchartsGraph/HighchartsGraph';
import TableGraph from './TableGraph/TableGraph';

interface GraphContainerProps {
    graph: Graph;
    width: number;
    height: number;
    graphHandler: React.MutableRefObject<GraphHandler>;
}

const GraphContainer = ({ graph, width, height, graphHandler }: GraphContainerProps) => {
    const [aggregatedData, setData] = useState([]);

    useEffect(() => {
        fetchAggregatedData();// eslint-disable-next-line
    }, [graph?.dataSourceId, graph?.graphConfig, graph?.template]);

    const fetchAggregatedData = async () => {
		if (graph?.dataSourceId && graph?.graphConfig) {
			const aggregatedData = await aggregatorCommunicator.getAggregatedData(graph?.graphConfig, graph?.dataSourceId);
            setData(aggregatedData);
        }
    };

    const GraphMap: PartialRecord<GraphType, React.ComponentType<any>> = {
        table: TableGraph,
    };

    const Component = GraphMap[graph.template.type] || HighchartsGraph;

    return (
        <Component
            aggregatedData={aggregatedData}
            width={width}
            height={height}
            graph={graph}
            graphHandler={graphHandler}
        />
    );
};

export default GraphContainer;
