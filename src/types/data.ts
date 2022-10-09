import { DataSourceId } from "./entities";

export type Data = any[];
export type Table = { data: Data, schema: string[]; };
export type TableDictionary = Record<DataSourceId, Table>;

export type DataInstanceInfo = { name: string; };
export type FullDataInstanceInfo = Record<DataSourceId, DataInstanceInfo>;
export type DashboardDataSources = { dataSourceId: string, displayName: string; }[];