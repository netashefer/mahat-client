import { config } from "../config";
import { Widget, WidgetWithoutId } from "../types/widget.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class WidgetCommunicator extends Communicator {
    async getDashboardWidgets(dashboardId: string) {
        try {
            return await requestProvider.get<Widget[]>(this.getFullURL(`widgets/dashboard/${dashboardId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addWidgetToDashboard(widget: WidgetWithoutId) {
        try {
            return await requestProvider.post<string>(this.getFullURL(`widgets/add`), { widget }, await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async removeWidgetFromDashboard(widgetId: string) {
        try {
            return await requestProvider.delete(this.getFullURL(`widgets/${widgetId}`), await this.getSecureHeaders());
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new WidgetCommunicator(config.graphServer.url, config.graphServer.auth0);