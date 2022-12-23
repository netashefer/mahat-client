import { useRecoilCallback } from "recoil";
import excelCommunicator from "../../communication/excelCommunicator";
import { notifyError } from "../../helpers/toaster";
import { dataSourcesAtom } from "../dataSources/dataSources";
import { graphsAtom } from "../graphs/graphs";
import { widgetsAtom } from "../widgets/widgets";

export const useRemoveDataSource = () => {
    return useRecoilCallback(({ set, snapshot }) => async (dataSourceId: string) => {
        try {
            await excelCommunicator.deleteDateSource(dataSourceId);
            set(dataSourcesAtom, prev => prev.filter(d => d.dataSourceId !== dataSourceId));
            const allGraphsIdsToRemove = (snapshot.getLoadable(graphsAtom).getValue()
                .filter(g => g.dataSourceId === dataSourceId) || [])
                .map(g => g.graphId);
            set(graphsAtom, prev => prev.filter(g => g.dataSourceId !== dataSourceId));
            set(widgetsAtom, prev => prev.filter(w => !allGraphsIdsToRemove.includes(w.graphId)));
        } catch {
            notifyError("We cannot delete this data source");
        }
    }, []);
};