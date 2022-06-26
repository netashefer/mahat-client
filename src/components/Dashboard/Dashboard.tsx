import { useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { Widget } from "../../types/widget";
import WidgetContainer, { WIDGET_DRAGGABLE_TITLE_CLASSNAME } from "../WidgetContainer/WidgetContainer";
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
    const a = localStorage.getItem("grid-layout");
    return a ? JSON.parse(a) : initialLayout;
}

const Dashboard = () => {
    const [layout] = useState<Layout[]>(getLayout());

    const widgets: Widget[] = [
        { id: '1', title: "neta", content: "n1" },
        { id: '2', title: "yahel", content: "n12" }
    ]

    return (
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
    );
}

export default Dashboard;
