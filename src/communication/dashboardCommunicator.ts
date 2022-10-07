import { config } from "../config";
import { Table } from "../types/data";
import { Dashboard } from "../types/entities";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class DashboardCommunicator extends Communicator {

    createNewDashboard(dashbaord: Dashboard) {
        try {
            return requestProvider.post<Table>(this.getFullURL("dashboards/create"), { dashbaord });
        } catch {
            return null;
        }
    }
}

export default new DashboardCommunicator(config.graphServerUrl);