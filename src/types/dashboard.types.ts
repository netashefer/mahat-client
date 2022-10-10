export type Dashboard = {
    dashboardName: string;
    dashboardId?: string;
};

export enum ManagerPanelOptions {
    none,
    catalog,
    dataSources
} 