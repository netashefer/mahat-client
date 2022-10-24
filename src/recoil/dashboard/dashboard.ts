import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { DashboardType } from '../../types/dashboard.types';

export const dashboardIdAtom = atom({
    key: 'dashboardId',
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
        return await dashboardCommunicator.getDashboard(get(dashboardIdAtom));
    }
});

export const dashboardAtom = atom({
    key: 'dashboardAtom',
    default: dashboardDefaultSelector,
});
