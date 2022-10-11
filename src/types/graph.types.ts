import { DataSourceId } from "./dataSource.types";
export type GraphType = string; // for now

export type Graph = {
    graphId: string;
    title: string;
    type: GraphType;
    dataSourceId: DataSourceId;
};