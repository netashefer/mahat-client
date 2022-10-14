import { atom, selector } from "recoil";
import widgetCommunicator from "../../communication/widgetCommunicator";
import { notifyError } from "../../helpers/toaster";
import { Widget } from "../../types/widget.types";
import { dashboardIdAtom } from "../dashboard/dashboard";

const widgetsDefaultSelector = selector<Widget[]>({
    key: 'widgetsDefaultSelector',
    get: async ({ get }) => {
        try {
            return await widgetCommunicator.getWidgetsOfDashboard(get(dashboardIdAtom));
        } catch {
            notifyError("We couldn't load your widgets");
            return [];
        }
    }
});

export const widgetsAtom = atom<Widget[]>({
    key: 'widgetsAtom',
    default: widgetsDefaultSelector,
});
