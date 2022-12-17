import { config } from "../config";
import { DashboardType } from "../types/dashboard.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    async createNewDashboard(dashboard: DashboardType) {
        try {
            return await requestProvider.post<string>(this.getFullURL("dashboards/create"), { dashboard }, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addDashboardPermissions(dashboardId: string, username: string) {
        try {
            const dashboardPermissions = {
                dashboardId,
                username
            };
            return await requestProvider.post(this.getFullURL("dashboards/addPermissions"), { dashboardPermissions }, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDashboardsByUsername(username: string) {
        try {
            return await requestProvider.get<DashboardType[]>(this.getFullURL(`dashboards/${username}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteDashboard(dashboardId: string) {
        try {
            return await requestProvider.delete(this.getFullURL(`dashboards/delete/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDashboardUserCount(dashboardId: string) {
        try {
            return await requestProvider.get<number>(this.getFullURL(`dashboards/countOfUsers/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getDashboard(dashboardId: string) {
        try {
            return await requestProvider.get<DashboardType>(this.getFullURL(`dashboards/dashboard/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addWatchedDashboardPermissions(dashboardId: string, username: string) {
        try {
            const dashboardPermissions = {
                dashboardId,
                username
            };
            return await requestProvider.post(this.getFullURL("dashboards/watchedPermission"), { dashboardPermissions }, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new DashboardCommunicator(config.graphServer.url, config.graphServer.auth0);