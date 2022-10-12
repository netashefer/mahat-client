import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { notifyError } from '../../helpers/toaster';
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
        try {
            return await dashboardCommunicator.getDashboard(get(dashabordIdAtom));
        } catch {
            notifyError("We couldn't load your dashboard");
            return null;
        }
    }
});

export const dashabordAtom = atom({
    key: 'dashabordAtom',
    default: dashboardDefaultSelector,
});
