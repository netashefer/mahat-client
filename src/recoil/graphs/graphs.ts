import { atom, selector } from "recoil";
import graphCommunicator from "../../communication/graphCommunicator";
import { notifyError } from "../../helpers/toaster";
import { Graph } from "../../types/graph.types";
import { dashabordIdAtom } from "../dashboard/dashboard";

const graphsDefaultSelector = selector<Graph[]>({
    key: 'graphsDefaultSelector',
    get: async ({ get }) => {
        try {
            return await graphCommunicator.getGraphsOfDashboard(get(dashabordIdAtom));
        } catch {
            notifyError("We couldn't load your graphs");
            return [];
        }
    }
});

export const graphsAtom = atom<Graph[]>({
    key: 'graphsAtom',
    default: graphsDefaultSelector,
});
