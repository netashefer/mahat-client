import { Aggragation, GraphType } from "../../../types/graph.types";
import { Item } from "../../Common/Dropdown/Dropdown";

export type FieldConfig = { aggregation: Aggragation, displayName: string; };

type chartConfig = {
    xFieldOptions: boolean;
    yFieldOptions: {
        func: FieldConfig['aggregation'];
        funcDisplayName: FieldConfig['displayName'];
        field?: string;
    }[];
    isYField: boolean;
    isDataFields: boolean;
};
export const graphTypes: Item<GraphType>[] = [
    { value: 'pie', label: 'Pie' },
    { value: 'column', label: 'Column' },
    { value: 'line', label: 'Line' },
    { value: 'table', label: 'Table' }
];

export const chartMapping: Record<GraphType, chartConfig> = {
    pie: {
        xFieldOptions: false,
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
        isYField: true,
        isDataFields: false,
    },
    column: {
        xFieldOptions: true,
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
        isYField: false,
        isDataFields: false,
    },
    line: {
        xFieldOptions: true,
        yFieldOptions: [{
            func: 'uniqueValues',
            funcDisplayName: 'By Unique Values',
        }, {
            func: 'valuesCount',
            funcDisplayName: 'By Records Count'
        }],
        isYField: false,
        isDataFields: false,
    },
    table: {
        xFieldOptions: false,
        yFieldOptions: [],
        isYField: false,
        isDataFields: true,
    }
};