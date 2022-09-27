import { Table } from "../types/data";
import requestProvider from "./requestProvider";

class ExcelCommunicator {
    async getParsedTable(body: { table: Table; }) {
        try {
            return await requestProvider.post<Table>("excel/parse", { body });
        } catch {
            return null;
        }
    }
}

export default new ExcelCommunicator();