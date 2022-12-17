import DeleteIcon from '@mui/icons-material/Delete';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import graphCommunicator from '../../../communication/graphCommunicator';
import { useAddWidget, useRemoveWidgetByGraphId } from '../../../recoil/customHooks/useWidgetHandler';
import { graphsAtom } from '../../../recoil/graphs/graphs';
import { GraphType, GRAPH_DRAG_AND_DROP_KEY } from '../../../types/graph.types';
import { GraphIcon } from '../../Common/GraphIcon/GraphIcon';
import './GraphItem.scss';

interface GraphItemProps {
    graphId: string;
    title: string;
    type: GraphType;
}

const GraphItem = ({ graphId, title, type }: GraphItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const addWidget = useAddWidget();
	const deleteWidgetByGraphId = useRemoveWidgetByGraphId();

    const drag = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData(GRAPH_DRAG_AND_DROP_KEY, graphId);
    };

    const deleteGraph = useRecoilCallback(({ set }) => async () => {
		deleteWidgetByGraphId(graphId);
        await graphCommunicator.deleteGraph(graphId);
        set(graphsAtom, prev => prev?.filter(g => g.graphId !== graphId));
    }, [graphId]);

    const GraphTypeIcon = GraphIcon[type] || QuestionMarkIcon;
    return (
        <div
            className='graph-item'
            draggable
            onDragStart={drag}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDoubleClick={() => addWidget(graphId)}
        >
            <GraphTypeIcon className="graph-icon" />
            <div className='title'>{title}</div>
            {isHovered && <DeleteIcon className='delete-icon' onClick={deleteGraph} />}
        </div>
    );
};

export default GraphItem;
