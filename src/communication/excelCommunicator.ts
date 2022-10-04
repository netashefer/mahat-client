import { config } from "../config";
import { getWorkBook } from "../helpers/xls-reader";
import { Table } from "../types/data";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class ExcelCommunicator extends Communicator {

    getParsedTable(body: { table: Table; }) {
        try {
            return requestProvider.post<Table>(this.getFullURL("excel/parse"), body);
        } catch {
            return null;
        }
    }

    saveExcel(evt: ProgressEvent<FileReader>) {
        try {
            const wb = getWorkBook(evt);
            requestProvider.post(this.getFullURL("excel/save"), { file: wb });
        } catch (e) {
            console.error(e);
        }
    }
}

export default new ExcelCommunicator(config.processingServiceUrl);