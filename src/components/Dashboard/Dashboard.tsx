import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import { useRecoilState } from "recoil";
import { useAddWidget } from "../../recoil/customHooks/useWidgetHandler";
import { widgetsAtom } from "../../recoil/widgets/widgets";
import { GRAPH_DRAG_AND_DROP_KEY } from "../../types/graph.types";
import WidgetContainer, { WIDGET_DRAGGABLE_TITLE_CLASSNAME } from "../WidgetContainer/WidgetContainer";
import EmptyDashboard from './EmptyDashboard/EmptyDashboard';
import './Dashboard.scss';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DASHBOARD_COLS = 10;

const Dashboard = () => {
    const addWidget = useAddWidget();
    const [widgets, setWidgets] = useRecoilState(widgetsAtom);
    const layout = widgets?.map(w => w.widgetProps);

    const handleLayoutChange = (layout: any[], layouts: any) => {
        setWidgets(prev => {
            return prev.map(widget => {
                const props = layout.find(l => l.i === widget.widgetId);
                return { ...widget, widgetProps: props };
            });
        });
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const graphId = event.dataTransfer.getData(GRAPH_DRAG_AND_DROP_KEY)?.replace("\n", "");
        addWidget(graphId);

    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const applyAllSizes = (config: any) => {
        return { lg: config, md: config, sm: config, xs: config, xxs: config };
    };

    return (
        <div className="dashboard" onDrop={onDrop} onDragOver={allowDrop}>
            {
                widgets?.length ?
                    <ResponsiveGridLayout
                        className="layout"
                        resizeHandles={["se"]}
                        preventCollision={false}
                        draggableHandle={`.${WIDGET_DRAGGABLE_TITLE_CLASSNAME}`}
                        onLayoutChange={handleLayoutChange}
                        isResizable
                        isDraggable
                        layouts={applyAllSizes(layout)}
                        cols={applyAllSizes(DASHBOARD_COLS)}
                        rowHeight={80}
                    >
                        {
                            widgets.map(w =>
                                <div key={w.widgetId}>
                                    <WidgetContainer {...w} />
                                </div>
                            )}

                    </ResponsiveGridLayout>
                    :
                    <EmptyDashboard />
            }

        </div>
    );
};

export default Dashboard;
