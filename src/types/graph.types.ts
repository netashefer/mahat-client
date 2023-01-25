import { DataSourceId } from "./dataSource.types";

export type GraphType = "pie" | "line" | "column" | 'table' | 'wordcloud';

export type Graph = {
    graphId?: string;
    title: string;
    template: { type: GraphType; seriesName?: string; };
    dataSourceId: DataSourceId;
    graphConfig: GraphConfig;
};

export type GraphWorkshopState = {
    isEditMode: boolean,
    creationUser: string,
};

export enum Aggragation {
    uniqueValues = 'uniqueValues',
    valuesCount = 'valuesCount',
    sum = 'sum'
}

export const DependentAggregation = [Aggragation.uniqueValues, Aggragation.sum];

export type GraphConfig = {
    x_field: string;
    y_field: { aggragation?: Aggragation; field?: string; };
    dataFields?: string[];
    dataFieldsAggregation: 'weight' | null;
};

export const GRAPH_DRAG_AND_DROP_KEY = "graph-dnd";