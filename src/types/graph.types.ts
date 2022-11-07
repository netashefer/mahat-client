import { DataSourceId } from "./dataSource.types";

export type GraphType = string; // for now

export type Graph = {
    graphId: string;
    title: string;
    template: { type: GraphType; };
    dataSourceId: DataSourceId;
    graphConfig: GraphConfig;
};

export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: "sum" | "none"; field?: string; };
};

export const GRAPH_DRAG_AND_DROP_KEY = "graph-dnd";