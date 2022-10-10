import { Table } from "./table.types";

export type DataSource = {
    dataSourceId: DataSourceId;
    table: Table;
    displayName: string,
    dashboardId: string;
};

export type DashboardDataSources = DataSourceIdentifiers[];

export type DataSourceId = string;

export type DataSourceIdentifiers = {
    dataSourceId: DataSourceId;
    displayName: string;
};

export type DataSourceWithoutId = Omit<DataSource, "dataSourceId">;


export enum FileUploadStage {
    add,
    replace
}