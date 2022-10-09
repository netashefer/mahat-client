
import { Widget } from '../../types/entities';
import { ReactComponent as XIcon } from '../../icons/x.svg';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
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
                <XIcon className='remove-icon' />
            </div>
            {content}
        </div>
    );
};

export default WidgetContainer;
