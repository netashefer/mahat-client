import { config } from "../config";
import { DashboardDataSources, DataSource, DataSourceId, DataSourceWithoutId } from "../types/dataSource.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class ExcelCommunicator extends Communicator {

    async addExcelDataSource(excelDataSource: DataSourceWithoutId) {
        try {
            return await requestProvider.post<string>(this.getFullURL("excel/addDataSource"), excelDataSource, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDashboardDataSources(dashboardId: string) {
        try {
            return await requestProvider.get<DashboardDataSources>(this.getFullURL(`excel/dashboard/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getSchema(dataSourceId: DataSourceId) {
        try {
            return await requestProvider.get<string[]>(this.getFullURL(`excel/schema/${dataSourceId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteDateSource(dataSourceId: DataSourceId) {
        try {
            return await requestProvider.delete(this.getFullURL(`excel/${dataSourceId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async replaceExcelDataSource(excelDataSource: DataSource) {
        try {
            return await requestProvider.put<string>(this.getFullURL("excel/replace"), excelDataSource, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new ExcelCommunicator(config.processingService.url, config.processingService.auth0);