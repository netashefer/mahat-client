
import RemoveIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import { useRemoveWidget } from '../../recoil/customHooks/useWidgetHandler';
import { Widget } from '../../types/widget.types';
import GraphContainer from '../GraphContainer/GraphContainer';
import './WidgetContainer.scss';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

const WidgetContainer = ({ widgetId, graphId, widgetProps }: WidgetContainerProps) => {
    const removeWidget = useRemoveWidget();
    const containerRef = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            setWidth(event[0].contentBoxSize[0].inlineSize);
            setHeight(event[0].contentBoxSize[0].blockSize);
        });

        resizeObserver.observe(containerRef.current);
    });

    return (
        <div
            className="widget-container"
            key={widgetId}
            ref={containerRef}
        >
            <div className='widget-top'>
                <EditIcon className='edit-icon' />
                <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                    {widgetId}
                </p>
                <RemoveIcon className='remove-icon' onClick={() => removeWidget(widgetId)} />
            </div>
            <GraphContainer width={width} data={[]} spec={{}} graphId={graphId} height={height} />
        </div>
    );
};

export default WidgetContainer;
