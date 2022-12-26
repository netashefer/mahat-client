import { GraphConfig } from "../types/graph.types";

const TABLE_HEADER_WIDTH = 200;

export const prepTable = (graphConfig: GraphConfig) => {
    return graphConfig.dataFields?.map(field => ({ field, headerName: field, width: TABLE_HEADER_WIDTH }));
};