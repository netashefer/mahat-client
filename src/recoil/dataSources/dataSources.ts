import { atom, selector } from 'recoil';
import excelCommunicator from '../../communication/excelCommunicator';
import { notifyError } from '../../helpers/toaster';
import { DashboardDataSources } from '../../types/dataSource.types';
import { dashboardIdAtom } from '../dashboard/dashboard';

const dataSourcesDefaultSelector = selector<DashboardDataSources>({
    key: 'dataSourcesDefaultSelector',
    get: async ({ get }) => {
        try {
            return await excelCommunicator.getDashboardDataSources(get(dashboardIdAtom));
        } catch {
            notifyError("We couldn't load your data sources");
            return [];
        }
    }
});

export const dataSourcesAtom = atom<DashboardDataSources>({
    key: 'dataSourcesAtom',
    default: dataSourcesDefaultSelector,
});