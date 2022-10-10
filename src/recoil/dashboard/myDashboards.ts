import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { notifyError } from '../../helpers/toaster';
import { DashboardType } from '../../types/dashboard.types';

const myDashboardsDefaultSelector = selector<DashboardType[]>({
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
