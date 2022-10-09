import { config } from "../config";
import { Dashboard } from "../types/entities";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    async createNewDashboard(dashboard: Dashboard) {
        try {
            return await requestProvider.post<string>(this.getFullURL("dashboards/create"), { dashboard }, await this.getSecureHeaders());
        } catch (e) {
            throw e;
        }
    }

    async addDashboardPermissions(dashboardId: string) {
        try {
            const dashboardPermissions = {
                dashboardId,
                username: "neta"
            };
            return await requestProvider.post(this.getFullURL("dashboards/addPermissions"), { dashboardPermissions }, await this.getSecureHeaders());
        } catch (e) {
            throw e;
        }
    }

    async getMyDashboards() {
        try {
            return await requestProvider.get<Dashboard[]>(this.getFullURL(`dashboards/${"neta"}`), await this.getSecureHeaders());
        } catch (e) {
            throw e;
        }
    }

    async deleteDashboard(dashboardId: string) {
        try {
            return await requestProvider.delete(this.getFullURL(`dashboards/delete/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            throw e;
        }
    }
}

export default new DashboardCommunicator(config.graphServer.url, config.graphServer.auth0);