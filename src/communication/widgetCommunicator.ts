import { config } from "../config";
import { Widget, WidgetWithoutId } from "../types/widget.types";
import Communicator from "./Communicator";
import requestProvider from "./requestProvider";

class WidgetCommunicator extends Communicator {

    getWidgetsOfDashboard(dashboardId: string) {
        try {
            return requestProvider.get<Widget[]>(this.getFullURL(`widgets/dashboard/${dashboardId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    addWidgetToDashboard(widget: WidgetWithoutId) {
        try {
            return requestProvider.post<string>(this.getFullURL(`widgets/add`), { widget });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    removeWidgetFromDashboard(widgetId: string) {
        try {
            return requestProvider.delete(this.getFullURL(`widgets/${widgetId}`));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default new WidgetCommunicator(config.graphServerUrl);