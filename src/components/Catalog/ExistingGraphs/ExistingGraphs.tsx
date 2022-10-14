import FileIcon from '@mui/icons-material/InsertDriveFile';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { dataSourcesAtom } from '../../../recoil/dataSources/dataSources';
import { graphsAtom } from '../../../recoil/graphs/graphs';
import { Graph } from '../../../types/graph.types';
import withLoader from '../../Common/withLoader/withLoader';
import GraphItem from '../GraphItem/GraphItem';
import './ExistingGraphs.scss';

const ExistingGraphs = () => {
    const graphs: Graph[] = useRecoilValue(graphsAtom);
    const dataSources = useRecoilValue(dataSourcesAtom);
    const entries = Object.entries(_.groupBy(graphs, g => g.dataSourceId));

    return (
        <div className='existing-graphs'>
            {
                entries.map(([dataSourceId, graphs]) => {
                    return <div key={dataSourceId}>
                        <div className='data-source-header'>
                            <FileIcon className='file-icon' />
                            {dataSources.find(d => d.dataSourceId === dataSourceId)?.displayName}
                        </div>
                        {
                            graphs.map(g =>
                                <GraphItem
                                    key={g.graphId}
                                    graphId={g.graphId}
                                    title={g.title}
                                    type={g.template?.type}
                                />
                            )
                        }
                    </div>;
                })
            }
        </div>
    );
};

export default withLoader(ExistingGraphs);
