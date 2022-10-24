import { config } from "../config";
import { Graph } from "../types/graph.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class GraphCommunicator extends Communicator {
    async getDashboardGraphs(dashboardId: string) {
        try {
            return requestProvider.get<Graph[]>(this.getFullURL(`graphs/dashboard/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteGraph(graphId: string) {
        try {
            return requestProvider.delete(this.getFullURL(`graphs/${graphId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new GraphCommunicator(config.graphServer.url, config.processingService.auth0);