import { Aggragation, GraphType } from "../../../types/graph.types";

export type FieldConfig = { value: string | Aggragation, displayName: string; };

type chartConfig = {
    yFieldOptions: FieldConfig[];
};

export const chartMapping: Record<GraphType, chartConfig> = {
    pie: {
        yFieldOptions: [{ value: 'uniqueValues', displayName: 'By Unique Values' }, { value: 'valuesCount', displayName: 'By Values Count' }]
    },
    column: {
        yFieldOptions: [{ value: 'uniqueValues', displayName: 'By Unique Values' }, { value: 'valuesCount', displayName: 'By Values Count' }]
    },
    line: {
        yFieldOptions: [{ value: 'uniqueValues', displayName: 'By Unique Values' }, { value: 'valuesCount', displayName: 'By Values Count' }]
    }
};