import React, { useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import { useRecoilValue } from "recoil";
import { useAddWidget } from "../../recoil/customHooks/useWidgetHandler";
import { widgetsAtom } from "../../recoil/widgets/widgets";
import { GRAPH_DRAG_AND_DROP_KEY } from "../../types/graph.types";
import { Widget } from "../../types/widget.types";
import WidgetContainer, { WIDGET_DRAGGABLE_TITLE_CLASSNAME } from "../WidgetContainer/WidgetContainer";
import './Dashboard.scss';
import EmptyDashboard from './EmptyDashboard/EmptyDashboard';

const ResponsiveGridLayout = WidthProvider(Responsive);

const handleLayoutChange = (layout: any, layouts: any) => {
    localStorage.setItem("grid-layout", JSON.stringify(layout));
};

const initialLayout: Layout[] = [
    { i: `1`, x: 0, y: 0, w: 1, h: 2 },
    { i: "2", x: 1, y: 8, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "3", x: 4, y: 5, w: 6, h: 3 }
];

const getLayout = () => {
    const savedGridLayout = localStorage.getItem("grid-layout");
    return savedGridLayout ? JSON.parse(savedGridLayout) : initialLayout;
};

const Dashboard = () => {
    const [layout] = useState<Layout[]>(getLayout());
    const addWidget = useAddWidget();
    const widgets: Widget[] = useRecoilValue(widgetsAtom);

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const graphId = event.dataTransfer.getData(GRAPH_DRAG_AND_DROP_KEY)?.replace("\n", "");
        addWidget(graphId);

    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
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
                        layouts={{ lg: layout }}
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
