import { Aggragation, GraphType } from "../../../types/graph.types";
import { Item } from "../../Common/Dropdown/Dropdown";

export type FieldConfig = { aggregation: Aggragation, displayName: string; };

type ChartConfig = {
    xFieldLabel?: string;
    yFieldOptions?: {
        func: FieldConfig['aggregation'];
        funcDisplayName: FieldConfig['displayName'];
        field?: string;
    }[];
    isDataFields?: boolean;
};
export const graphTypes: Item<GraphType>[] = [
    { value: 'pie', label: 'Pie' },
    { value: 'column', label: 'Column' },
    { value: 'line', label: 'Line' },
    { value: 'table', label: 'Table' }
];

export const chartMapping: Record<GraphType, ChartConfig> = {
    pie: {
        xFieldLabel: "split according to",
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
    },
    column: {
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
    },
    line: {
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
    },
    table: {
        isDataFields: true,
    }
};