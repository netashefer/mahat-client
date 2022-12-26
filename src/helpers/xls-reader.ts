import readXlsxFile, { Row } from 'read-excel-file';
import { Table } from "../types/table.types";
import { notifyError } from "./toaster";

export const convertToJson = (rows: Row[]): Table => {
    const result = [];

    const headers = rows[0];

    for (let i = 1; i < rows.length; i++) {
        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j] as string] = rows[i][j];
        }
        result.push(obj);
    }

    return { data: result, schema: headers as string[] };
};

export const onLoad = async (
    file: File,
    onReadingSucceed: (table: Table, filename: string) => void,
    onReadingEnd: () => void
) => {
    const data = await readXlsxFile(file, { dateFormat: 'mm/dd/yyyy' });
    const table: Table = convertToJson(data);
    try {
        onReadingSucceed(table, file.name);
    } catch {
        notifyError("We couldnt add this excel...");
    } finally {
        onReadingEnd();
    }
};