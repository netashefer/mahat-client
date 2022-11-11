import { atom, selector, selectorFamily } from "recoil";
import graphCommunicator from "../../communication/graphCommunicator";
import { notifyError } from "../../helpers/toaster";
import { Graph } from "../../types/graph.types";
import { dashboardIdAtom } from "../dashboard/dashboard";

const graphsDefaultSelector = selector<Graph[]>({
    key: 'graphsDefaultSelector',
    get: async ({ get }) => {
        try {
            return await graphCommunicator.getDashboardGraphs(get(dashboardIdAtom));
        } catch {
            notifyError("We couldn't load your graphs");
            return [];
        }
    }
});

export const graphsAtom = atom<Graph[]>({
    key: 'graphsAtomKey',
    default: graphsDefaultSelector,
});

export const graphItemSelector = selectorFamily<Graph, string>({
    key: "graphItemSelector",
    get: (graphId) => ({ get }) => {
        return get(graphsAtom)?.find(g => g.graphId === graphId);
    },
});