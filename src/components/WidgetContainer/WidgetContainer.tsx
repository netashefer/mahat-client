
import { Widget } from '../../types/entities';
import './WidgetContainer.scss';

interface WidgetContainerProps extends Widget { }

export const WIDGET_DRAGGABLE_TITLE_CLASSNAME = "widget-draggable-title";

const WidgetContainer = ({ content, id, title }: WidgetContainerProps) => {
    return (
        <div
            className="widget-container"
            key={id}
        >
            <p className={WIDGET_DRAGGABLE_TITLE_CLASSNAME}>
                {title}
            </p>
            {content}
        </div>
    );
};

export default WidgetContainer;
