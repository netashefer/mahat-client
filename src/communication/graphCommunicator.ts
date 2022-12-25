import { config } from "../config";
import { Graph } from "../types/graph.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class GraphCommunicator extends Communicator {
    async createGraph(graph: Graph) {
        try {
            return await requestProvider.post(this.getFullURL(`graphs/create`), graph, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

	async editGraph(graph: Graph) {
		try {
            return await requestProvider.put(this.getFullURL(`graphs/edit`), graph, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
	}

    async getDashboardGraphs(dashboardId: string) {
        try {
            return await requestProvider.get<Graph[]>(this.getFullURL(`graphs/dashboard/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteGraph(graphId: string) {
        try {
            return await requestProvider.delete(this.getFullURL(`graphs/${graphId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new GraphCommunicator(config.graphServer.url, config.graphServer.auth0);