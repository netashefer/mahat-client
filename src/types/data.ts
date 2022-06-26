export type Data = any[];
export type Table = { data: Data, schema: string[] };
export type TableDictionary = Record<string, { data: Data, schema: string[] }>;