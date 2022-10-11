import { GraphType } from '../../../types/graph.types';
import { GraphIcon } from '../../Common/GraphIcon/GraphIcon';
import './GraphItem.scss';

interface GraphItemProps {
    graphId: string;
    title: string;
    type: GraphType;
}

const GraphItem = ({ graphId, title, type }: GraphItemProps) => {
    const Icon = GraphIcon[type];
    return (
        <div className='graph-item'>
            <Icon className="graph-icon" />
            <div className='title'>{title}</div>
        </div>
    );
};

export default GraphItem;
