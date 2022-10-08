import { config } from "../config";
import { Table } from "../types/data";
import { Dashboard } from "../types/entities";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    createNewDashboard(dashboard: Dashboard) {
        try {
            return requestProvider.post<Table>(this.getFullURL("dashboards/create"), { dashboard });
        } catch (e) {
            throw e;
        }
    }
}

export default new DashboardCommunicator(config.graphServerUrl);