
import { Widget } from '../../types/widget.types';
import RemoveIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import './WidgetContainer.scss';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

const WidgetContainer = ({ content, id, title }: WidgetContainerProps) => {
    return (
        <div
            className="widget-container"
            key={id}
        >
            <div className='widget-top'>
                <EditIcon className='edit-icon' />
                <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                    {title}
                </p>
                <RemoveIcon className='remove-icon' />
            </div>
            {content}
        </div>
    );
};

export default WidgetContainer;
