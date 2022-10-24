import { GraphType, GRAPH_DRAG_AND_DROP_KEY } from '../../../types/graph.types';
import { GraphIcon } from '../../Common/GraphIcon/GraphIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import './GraphItem.scss';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import graphCommunicator from '../../../communication/graphCommunicator';
import { graphsAtom } from '../../../recoil/graphs/graphs';
import { useAddWidget } from '../../../recoil/customHooks/useWidgetHandler';

interface GraphItemProps {
    graphId: string;
    title: string;
    type: GraphType;
}

const GraphItem = ({ graphId, title, type }: GraphItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const addWidget = useAddWidget();

    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData(GRAPH_DRAG_AND_DROP_KEY, graphId);
    };

    const deleteGraph = useRecoilCallback(({ set }) => async () => {
        await graphCommunicator.deleteGraph(graphId);
        set(graphsAtom, prev => prev?.filter(g => g.graphId !== graphId));
    }, [graphId]);

    const Icon = GraphIcon[type];
    return (
        <div
            className='graph-item'
            draggable
            onDragStart={drag}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDoubleClick={() => addWidget(graphId)}
        >
            <Icon className="graph-icon" />
            <div className='title'>{title}</div>
            {isHovered && <DeleteIcon className='delete-icon' onClick={deleteGraph} />}
        </div>
    );
};

export default GraphItem;
