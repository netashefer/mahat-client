import { CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import aggregatorCommunicator from '../../communication/aggregatorCommunicator';
import { DATA_SOURCE_REPLACED } from '../../constants/events';
import { useEventListener } from '../../recoil/customHooks/useEventListener';
import { Graph, GraphType } from '../../types/graph.types';
import { PartialRecord } from '../../types/utility.types';
import { GraphHandler } from '../WidgetContainer/WidgetContainer';
import GraphError from './GraphError/GraphError';
import HighchartsGraph from './HighchartsGraph/HighchartsGraph';
import TableGraph from './TableGraph/TableGraph';
import './GraphContainer.scss';

interface GraphContainerProps {
    graph: Graph;
    width: number;
    height: number;
    graphHandler: React.MutableRefObject<GraphHandler>;
}

const GraphContainer = ({ graph, width, height, graphHandler }: GraphContainerProps) => {
    const [aggregatedData, setData] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);

    const handleEvent = (e: MessageEvent) => {
        if (e.data.type === DATA_SOURCE_REPLACED && e.data?.dataSourceId === graph.dataSourceId) {
            fetchAggregatedData();
        }
    };
    useEventListener('message', handleEvent);

    useEffect(() => {
        fetchAggregatedData();// eslint-disable-next-line
    }, [graph?.dataSourceId, graph?.graphConfig, graph?.template]);

    const fetchAggregatedData = async () => {
        if (graph?.dataSourceId && graph?.graphConfig) {
            try {
                const aggregatedData = await aggregatorCommunicator.getAggregatedData(graph?.graphConfig, graph?.dataSourceId);
                setData(aggregatedData);
            } catch (e) {
                if (e instanceof AxiosError && e.response.status === 406) {
                    setInvalidFields(e.response.data.invalidFields);
                }
            }
        }
    };

    const GraphMap: PartialRecord<GraphType, React.ComponentType<any>> = {
        table: TableGraph,
    };

    const Component = GraphMap[graph.template.type] || HighchartsGraph;

    return (
        <div className='graph-container'>
            {

                invalidFields?.length ?
                    <GraphError invalidFields={invalidFields} />
                    :
                    _.isNull(aggregatedData) ?
                        <CircularProgress />
                        :
                        <Component
                            aggregatedData={aggregatedData}
                            width={width}
                            height={height}
                            graph={graph}
                            graphHandler={graphHandler}
                        />
            }
        </div>
    );
};

export default GraphContainer;
