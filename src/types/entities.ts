export interface Widget {
    id: string;
    content: string;
    title: string;
}

export type DataSourceId = string;
export type DataSource = {
    dataSourceId: DataSourceId;
    displayName: string;
};
export type Dashboard = {
    dashboardName: string;
    dashboardId?: string;
};