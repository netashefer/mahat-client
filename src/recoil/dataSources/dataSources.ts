import { atom, selector } from 'recoil';
import excelCommunicator from '../../communication/excelCommunicator';
import { DashboardDataSources } from '../../types/data';
import { dashabordIdAtom } from '../dashboard/dashboard';

const dataSourcesDefaultSelector = selector<DashboardDataSources>({
    key: 'dataSourcesDefaultSelector',
    get: async ({ get }) => {
        return await excelCommunicator.getDashboardDataSources(get(dashabordIdAtom));
    }
});

export const dataSourcesAtom = atom<DashboardDataSources>({
    key: 'dataSourcesAtom',
    default: dataSourcesDefaultSelector,
});


