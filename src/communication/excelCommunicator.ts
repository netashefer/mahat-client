import { config } from "../config";
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
}

export default new ExcelCommunicator(config.processingServiceUrl);