import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { DashboardType } from '../../types/dashboard.types';

export const dashabordIdAtom = atom({
    key: 'dashabordId',
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
        return await dashboardCommunicator.getDashboard(get(dashabordIdAtom));
    }
});

export const dashabordAtom = atom({
    key: 'dashabordAtom',
    default: dashboardDefaultSelector,
});
