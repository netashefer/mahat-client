export interface Widget {
    id: string;
    content: string;
    title: string;
}

export type DataInstanceId = string;

export type Dashboard = {
    dashboardName: string;
    dashboardId?: string;
};