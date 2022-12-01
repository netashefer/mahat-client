import { atomFamily, selectorFamily } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { notifyError } from '../../helpers/toaster';
import { DashboardType } from '../../types/dashboard.types';

const myDashboardsDefaultSelector = selectorFamily<DashboardType[], string>({
    key: 'myDashboardsDefaultSelector',
    get: (username) => async () => {
        try {
            return await dashboardCommunicator.getMyDashboards(username);
        } catch {
            notifyError("We couldn't load your dashboards");
            return [];
        }
    }
});

export const myDashabordsAtom = atomFamily<DashboardType[], string>({
    key: 'myDashabordsAtom',
    default: myDashboardsDefaultSelector,
});
