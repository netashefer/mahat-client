import { Table } from "../types/data";
import * as XLSX from 'xlsx';
import excelCommunicator from "../communication/excelCommunicator";
import { notifyError } from "./toaster";
import { DataSource } from "../types/entities";

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

export const onLoad = async (
    dashboardId: string,
    evt: ProgressEvent<FileReader>,
    file: File,
    onReadingSucceed: (newDataSource: DataSource) => void,
    onReadingEnd: () => void
) => {// evt = on_file_select event
    const workBook = getWorkBook(evt);
    const workSheetName = workBook.SheetNames[0];/* Get first worksheet */
    const workSheet = workBook.Sheets[workSheetName];
    const data = XLSX.utils.sheet_to_csv(workSheet);/* Convert array of arrays */

    const table: Table = convertToJson(data);
    try {
        const dataSourceId = await excelCommunicator.addExcelDataSource({ table, dashboardId, displayName: file.name });
        onReadingSucceed({ dataSourceId, displayName: file.name });
    } catch {
        notifyError("we couldnt add this excel...");
    } finally {
        onReadingEnd();
    }
};

export const getWorkBook = (evt: ProgressEvent<FileReader>) => {
    const bstr = evt.target.result;/* Parse data */
    const wb = XLSX.read(bstr, { type: "binary" });
    return wb;
};