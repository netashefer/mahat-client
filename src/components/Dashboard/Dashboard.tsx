import React, { useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import WidgetContainer, { WIDGET_DRAGGABLE_TITLE_CLASSNAME } from "../WidgetContainer/WidgetContainer";
import EmptyDashboard from './EmptyDashboard/EmptyDashboard';
import { DashboardType } from "../../types/dashboard.types";
import { Widget } from "../../types/widget.types";
import { GRAPH_DRAG_AND_DROP_KEY } from "../../types/graph.types";
import 'react-grid-layout/css/styles.css';
import './Dashboard.scss';

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

const Dashboard = ({ dashboard }: { dashboard: DashboardType; }) => {
    const [layout] = useState<Layout[]>(getLayout());

    const widgets: Widget[] = [
        { id: '1', title: "neta", content: "n1" },
        { id: '2', title: "yahel", content: "n12" }
    ];

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const graphId = event.dataTransfer.getData(GRAPH_DRAG_AND_DROP_KEY);
        alert("add graph" + graphId);
    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="dashboard" onDrop={onDrop} onDragOver={allowDrop}>
            {
                dashboard.widgets?.length ?
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
                                <div key={w.id}>
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
