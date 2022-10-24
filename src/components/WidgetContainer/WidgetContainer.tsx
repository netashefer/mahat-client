
import { Widget } from '../../types/widget.types';
import RemoveIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import './WidgetContainer.scss';
import { useRemoveWidget } from '../../recoil/customHooks/useWidgetHandler';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

const WidgetContainer = ({ widgetId, graphId, widgetProps }: WidgetContainerProps) => {
    const removeWidget = useRemoveWidget();
    return (
        <div
            className="widget-container"
            key={widgetId}
        >
            <div className='widget-top'>
                <EditIcon className='edit-icon' />
                <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                    {widgetId}
                </p>
                <RemoveIcon className='remove-icon' onClick={() => removeWidget(widgetId)} />
            </div>
            {graphId}
        </div>
    );
};

export default WidgetContainer;
