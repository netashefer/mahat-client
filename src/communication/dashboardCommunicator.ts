import { config } from "../config";
import { Table } from "../types/data";
import { Dashboard } from "../types/entities";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    createNewDashboard(dashboard: Dashboard) {
        try {
            return requestProvider.post<string>(this.getFullURL("dashboards/create"), { dashboard });
        } catch (e) {
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
            throw e;
        }
    }

    getMyDashboards() {
        try {
            return requestProvider.get<Dashboard[]>(this.getFullURL(`dashboards/${"neta"}`));
        } catch (e) {
            throw e;
        }
    }
}

export default new DashboardCommunicator(config.graphServerUrl);