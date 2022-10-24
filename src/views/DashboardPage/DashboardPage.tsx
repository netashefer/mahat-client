import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dashboardIdAtom, dashboardAtom } from "../../recoil/dashboard/dashboard";
import { ManagerPanelOptions } from "../../types/dashboard.types";
import Dashboard from "../../components/Dashboard/Dashboard";
import DataSourceManager from "../../components/DataManager/DataSourceManager";
import ShareLink from "../../components/ShareLink/ShareLink";
import DashboardActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const { dashboardId } = useParams(); // for link sharing 
    const setDashboardId = useSetRecoilState(dashboardIdAtom);
    const dashboard = useRecoilValue(dashboardAtom);
    const [openManagerPage, setOpenManager] = useState<ManagerPanelOptions>(ManagerPanelOptions.none);

    useEffect(() => {
        setDashboardId(dashboardId); // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard-page">
            <div className="dashboard-top">
                <div className="left-section">
                    <div className="dashboard-title">{dashboard.dashboardName}</div>
                    <ShareLink />
                </div>
                <DashboardActions
                    dashboardId={dashboard.dashboardId}
                    onAddDataSource={() => setOpenManager(ManagerPanelOptions.dataSources)}
                    onAddGrpah={() => setOpenManager(ManagerPanelOptions.catalog)}
                />
            </div>
            <div className="bottom">
                <Dashboard dashboard={dashboard} />
                {
                    openManagerPage === ManagerPanelOptions.dataSources &&
                    <DataSourceManager
                        dashboardId={dashboard.dashboardId}
                    />
                }
            </div>
        </div>
    );
};

export default DashbaordPage;