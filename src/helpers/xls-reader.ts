import { Table } from "../types/data";
import * as XLSX from 'xlsx';
import excelCommunicator from "../communication/excelCommunicator";

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
};

export const onLoad = (evt: ProgressEvent<FileReader>, file: Blob, callback: (table: Table, info: any) => void) => {// evt = on_file_select event
    const wb = getWorkBook(evt);
    excelCommunicator.saveExcel(evt);
    const wsname = wb.SheetNames[0];/* Get first worksheet */
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_csv(ws);/* Convert array of arrays */
    console.log("-----", data);

    const table: Table = convertToJson(data);
    callback(table, file);
};

export const getWorkBook = (evt: ProgressEvent<FileReader>) => {
    const bstr = evt.target.result;/* Parse data */
    const wb = XLSX.read(bstr, { type: "binary" });
    return wb;
};