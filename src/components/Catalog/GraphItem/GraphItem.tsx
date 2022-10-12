import { GraphType, GRAPH_DRAG_AND_DROP_KEY } from '../../../types/graph.types';
import { GraphIcon } from '../../Common/GraphIcon/GraphIcon';
import './GraphItem.scss';

interface GraphItemProps {
    graphId: string;
    title: string;
    type: GraphType;
}


const GraphItem = ({ graphId, title, type }: GraphItemProps) => {

    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData(GRAPH_DRAG_AND_DROP_KEY, graphId);
    };

    const Icon = GraphIcon[type];
    return (
        <div className='graph-item' draggable onDragStart={drag}>
            <Icon className="graph-icon" />
            <div className='title'>{title}</div>
        </div>
    );
};

export default GraphItem;
