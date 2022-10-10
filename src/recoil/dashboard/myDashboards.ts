import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { notifyError } from '../../helpers/toaster';
import { Dashboard } from '../../types/dashboard.types';

const myDashboardsDefaultSelector = selector<Dashboard[]>({
    key: 'myDashboardsDefaultSelector',
    get: async () => {
        try {
            return await dashboardCommunicator.getMyDashboards();
        } catch {
            notifyError("We couldn't load your dashboards");
            return [];
        }
    }
});

export const myDashabordsAtom = atom({
    key: 'myDashabordsAtom',
    default: myDashboardsDefaultSelector,
});
