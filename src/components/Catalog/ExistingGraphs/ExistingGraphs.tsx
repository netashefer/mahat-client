import FileIcon from '@mui/icons-material/InsertDriveFile';
import _ from 'lodash';
import { DashboardDataSources } from '../../../types/dataSource.types';
import { Graph } from '../../../types/graph.types';
import GraphItem from '../GraphItem/GraphItem';
import './ExistingGraphs.scss';

const ExistingGraphs = () => {
    const graphs: Graph[] = [
        { dataSourceId: "1", graphId: "1", title: "g1", type: "pie", dashboardId: "this" },
        { dataSourceId: "1", graphId: "2", title: "g2", type: "column", dashboardId: "this" },
        { dataSourceId: "2", graphId: "3", title: "g3", type: "line", dashboardId: "this" },
    ];
    const dataSources: DashboardDataSources = [
        { dataSourceId: "1", displayName: "Df" },
        { dataSourceId: "2", displayName: "neta" },
    ];

    const entries = Object.entries(_.groupBy(graphs, g => g.dataSourceId));

    return (
        <div className='existing-graphs'>
            {
                entries.map(([dataSourceId, graphs]) => {
                    return <div>
                        <div className='data-source-header'>
                            <FileIcon className='file-icon' />
                            {dataSources.find(d => d.dataSourceId === dataSourceId)?.displayName}
                        </div>
                        {
                            graphs.map(g =>
                                <GraphItem
                                    graphId={g.graphId}
                                    title={g.title}
                                    type={g.type}
                                />
                            )
                        }

                    </div>;
                })
            }
        </div>
    );
};

export default ExistingGraphs;
