import { GraphConfig } from "../types/graph.types";

export const prepTable = (graphConfig: GraphConfig) => {
    return graphConfig.dataFields?.map(field => ({ field: field.field, headerName: field.label }));
};