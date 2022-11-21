import { DataSourceId } from "./dataSource.types";

export type GraphType = "pie" | "line" | "column";

export type Graph = {
    graphId: string;
    title: string;
    template: { type: GraphType; };
    dataSourceId: DataSourceId;
    graphConfig: GraphConfig;
};

export type GraphWorkshopState = {
    isEditMode: boolean,
    creationUser: string,
};

export type Aggragation = 'uniqueValues' | 'valuesCount';

export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: Aggragation; field?: string; };
};

export const GRAPH_DRAG_AND_DROP_KEY = "graph-dnd";