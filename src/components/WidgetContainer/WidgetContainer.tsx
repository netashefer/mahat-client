
import RemoveIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notifyError } from '../../helpers/toaster';
import { useRemoveWidget } from '../../recoil/customHooks/useWidgetHandler';
import { graphSelector } from '../../recoil/graphs/graphs';
import { Widget } from '../../types/widget.types';
import GraphContainer from '../GraphContainer/GraphContainer';
import GraphWorkshop from '../GraphWorkshop/GraphWorkshop';
import './WidgetContainer.scss';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

const WidgetContainer = ({ widgetId, graphId, widgetProps }: WidgetContainerProps) => {
	const [shouldOpenGraphWorkshop, setShouldOpenGraphWorkshop] = useState(false);
    const removeWidget = useRemoveWidget();
    const containerRef = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const graph = useRecoilValue(graphSelector(graphId));

	console.log(graph)
	const deleteWidget = (widgetId: string) => {
		try {
			removeWidget(widgetId);
		} catch {
			notifyError("Failed to remove widget")
		}
	}

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        resizeObserver.observe(containerRef.current);
    }, []);

    return (
        <div
            className="widget-container"
            key={widgetId}
            ref={containerRef}
        >
            <div className='widget-top'>
                <EditIcon className='edit-icon' onClick={() => setShouldOpenGraphWorkshop(true)} />
                <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                    {graph?.title || "No Title"}
                </p>
                <RemoveIcon className='remove-icon' onClick={() => deleteWidget(widgetId)} />
            </div>
            {
                graph &&
                <GraphContainer
                    graph={graph}
                    width={width}
                    height={height}
                />
            }
			<GraphWorkshop isOpen={shouldOpenGraphWorkshop} onClose={() => setShouldOpenGraphWorkshop(false)} graphToEdit={graph}/>
        </div>
    );
};

export default WidgetContainer;
