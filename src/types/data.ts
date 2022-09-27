import { DataInstanceId } from "./entities";

export type Data = any[];
export type Table = { data: Data, schema: string[]; };
export type TableDictionary = Record<DataInstanceId, Table>;

export type DataInstanceInfo = { name: string; };
export type FullDataInstanceInfo = Record<DataInstanceId, DataInstanceInfo>;