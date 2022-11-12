import { config } from "../config";
import { Graph, GraphConfig } from "../types/graph.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class AggregatorCommunicator extends Communicator {
    async getAggregatedData(graphConfig: GraphConfig, dataSourceId: string) {
        try {
            return await requestProvider.post<Graph[]>(this.getFullURL(`aggregation/data`), { graphConfig, dataSourceId }, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new AggregatorCommunicator(config.processingService.url, config.processingService.auth0);