import { config } from "../config";
import { DashboardDataSources, DataSource, DataSourceId, DataSourceWithoutId } from "../types/dataSource.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class ExcelCommunicator extends Communicator {

    async addExcelDataSource(excelDataSource: DataSourceWithoutId) {
        try {
            return await requestProvider.post<string>(this.getFullURL("excel/addDataSource"), excelDataSource);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDashboardDataSources(dashboardId: string) {
        try {
            return await requestProvider.get<DashboardDataSources>(this.getFullURL(`excel/dashboard/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getschema(dataSourceId: DataSourceId) {
        try {
            return await requestProvider.get<string[]>(this.getFullURL(`excel/schema/${dataSourceId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteDateSource(dataSourceId: DataSourceId) {
        try {
            return await requestProvider.delete(this.getFullURL(`excel/${dataSourceId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async replaceExcelDataSource(excelDataSource: DataSource) {
        try {
            return await requestProvider.put<string>(this.getFullURL("excel/replace"), excelDataSource);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new ExcelCommunicator(config.processingServiceUrl);