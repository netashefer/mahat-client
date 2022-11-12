import { useRecoilCallback } from "recoil";
import widgetCommunicator from "../../communication/widgetCommunicator";
import { WidgetWithoutId } from "../../types/widget.types";
import { dashboardIdAtom } from "../dashboard/dashboard";
import { widgetsAtom } from "../widgets/widgets";

export const useAddWidget = () => {
    return useRecoilCallback(({ set, snapshot }) => async (graphId: string) => {
        const widget: WidgetWithoutId = {
            dashboardId: snapshot.getLoadable(dashboardIdAtom).getValue(),
            graphId,
            widgetProps: {},
        };

        const widgetId = await widgetCommunicator.addWidgetToDashboard(widget);
        set(widgetsAtom, prev => [...(prev || []), { ...widget, widgetId }]);
    }, []);
};

export const useRemoveWidget = () => {
    return useRecoilCallback(({ set, snapshot }) => async (widgetId: string) => {
        await widgetCommunicator.removeWidgetFromDashboard(widgetId);
        set(widgetsAtom, prev => prev.filter(w => w.widgetId !== widgetId));
    }, []);
};