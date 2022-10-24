import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { notifyError } from '../../helpers/toaster';
import { DashboardType } from '../../types/dashboard.types';

export const dashboardIdAtom = atom({
    key: 'dashboardIdAtom',
    default: null,
    effects: [
        ({ onSet }) => {
            onSet(newID => {
                localStorage.setItem('dashboard-id', newID);
            });
        },
    ],
});

const dashboardDefaultSelector = selector<DashboardType>({
    key: 'dashboardDefaultSelector',
    get: async ({ get }) => {
        const dashboardId = get(dashboardIdAtom);
        if (!dashboardId) return null;
        try {
            return await dashboardCommunicator.getDashboard(dashboardId);
        } catch {
            notifyError("We couldn't load your dashboard");
            return null;
        }
    }
});

export const dashboardAtom = atom({
    key: 'dashboardAtom',
    default: dashboardDefaultSelector,
});
