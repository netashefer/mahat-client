import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { Dashboard } from '../../types/entities';

const dashboardIdDefaultSelector = selector<string>({
    key: 'dashboardDefaulfdsftSelector',
    get: async ({ get }) => {
        return localStorage.getItem('dashboard-id');
    }
});

export const dashabordIdAtom = atom({
    key: 'dashabordId',
    default: dashboardIdDefaultSelector,
    effects: [
        ({ onSet }) => {
            onSet(newID => {
                localStorage.setItem('dashboard-id', newID);
            });
        },
    ],
});

const dashboardDefaultSelector = selector<Dashboard>({
    key: 'dashboardDefaultSelector',
    get: async ({ get }) => {
        console.log("id", get(dashabordIdAtom));
        return await dashboardCommunicator.getDashboard(get(dashabordIdAtom));
    }
});

export const dashabordAtom = atom({
    key: 'dashabordAtom',
    default: dashboardDefaultSelector,
});
