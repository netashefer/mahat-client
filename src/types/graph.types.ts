import { DataSourceId } from "./dataSource.types";

export type GraphType = string; // for now

export type Graph = {
    graphId: string;
    title: string;
    template: { type: GraphType; };
    dataSourceId: DataSourceId;
};

export const GRAPH_DRAG_AND_DROP_KEY = "graph-dnd";