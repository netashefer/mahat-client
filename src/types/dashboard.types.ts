import { Widget } from "./widget.types";

export type DashboardType = {
    dashboardName: string;
    dashboardId?: string;
    widgets?: Widget[];
};

export enum ManagerPanelOptions {
    none,
    catalog,
    dataSources
} 