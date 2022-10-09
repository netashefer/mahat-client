import { atom, selector } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { Dashboard } from '../../types/entities';

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

const dashboardDefaultSelector = selector<Dashboard>({
    key: 'dashboardDefaultSelector',
    get: async ({ get }) => {
        console.log(get(dashabordIdAtom));
        return await dashboardCommunicator.getDashboard(get(dashabordIdAtom));
    }
});

export const dashabordAtom = atom({
    key: 'dashabordAtom',
    default: dashboardDefaultSelector,
});
