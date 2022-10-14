import { config } from "../config";
import { Graph } from "../types/graph.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class GraphCommunicator extends Communicator {

    getGraphsOfDashboard(dashboardId: string) {
        try {
            return requestProvider.get<Graph[]>(this.getFullURL(`graphs/dashboard/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    deleteGraph(graphId: string) {
        try {
            return requestProvider.delete(this.getFullURL(`graphs/${graphId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new GraphCommunicator(config.graphServerUrl);