import { config } from "../config";
import { Table } from "../types/data";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class ExcelCommunicator extends Communicator {

    async addExcelDataSource(excelDataSource: { table: Table, displayName: string, dashboardId: string; }) {
        try {
            return await requestProvider.post<string>(this.getFullURL("excel/addDataSource"), excelDataSource);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new ExcelCommunicator(config.processingServiceUrl);