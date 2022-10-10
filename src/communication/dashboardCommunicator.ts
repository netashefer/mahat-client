import { config } from "../config";
import { Dashboard } from "../types/dashboard.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    createNewDashboard(dashboard: Dashboard) {
        try {
            return requestProvider.post<string>(this.getFullURL("dashboards/create"), { dashboard });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    addDashboardPermissions(dashboardId: string) {
        try {
            const dashboardPermissions = {
                dashboardId,
                username: "neta"
            };
            return requestProvider.post(this.getFullURL("dashboards/addPermissions"), { dashboardPermissions });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    getMyDashboards() {
        try {
            return requestProvider.get<Dashboard[]>(this.getFullURL(`dashboards/${"neta"}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    deleteDashboard(dashboardId: string) {
        try {
            return requestProvider.delete(this.getFullURL(`dashboards/delete/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    getDashboardUserCount(dashboardId: string) {
        try {
            return requestProvider.get<number>(this.getFullURL(`dashboards/countOfUsers/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    getDashboard(dashboardId: string) {
        try {
            return requestProvider.get<Dashboard>(this.getFullURL(`dashboards/dashboard/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new DashboardCommunicator(config.graphServerUrl);