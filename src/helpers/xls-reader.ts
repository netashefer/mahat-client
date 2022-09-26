import { identity } from "lodash";
import { Table } from "../types/data";

export const convertToJson = (csv: string): Table => {
    const lines = csv.split("\n");

    const result = [];

    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return { data: result, schema: headers };
}

export const parseTable = (table: Table) => { // should be on processing-service
    const columnParsingMap: Record<string, (value: string) => string | Date | number> = {};
    table.schema.forEach(column => {
        if (column.includes("(DATE)")) {
            columnParsingMap[column] = (d: string) => new Date(d)
        } else if (column.includes("(NUMBER)")) {
            columnParsingMap[column] = parseInt;
        } else {
            columnParsingMap[column] = identity;
        }
    })

    const data: any[] = [];
    table.data.forEach(dataRow => {
        table.schema.forEach(column => {
            dataRow[column] = columnParsingMap[column]?.(dataRow[column]);
        })
        data.push(dataRow);
    })

    table.data = data;
    return table;
}