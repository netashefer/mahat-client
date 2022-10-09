import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { ReactComponent as ShareIcon } from "../../icons/share.svg";
import { dashabordAtom } from "../../recoil/dashboard/dashboard";
import Dashboard from "../Dashboard/Dashboard";
import DataSourceManager from "../DataManager/DataManager";
import DashbaordActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const dashboard = useRecoilValue(dashabordAtom);
    const [openManagerPage, setOpenManager] = useState<"none" | "catalog" | "dataSources">("none");

    return (
        <div className="dashboard-page">
            <div className="dashboard-top">
                <div className="left-section">
                    <div className="dashboard-title">{dashboard.dashboardName}</div>
                    <ShareIcon className="share-icon" />
                </div>
                <DashbaordActions
                    dashboardId={dashboard.dashboardId}
                    onAddDataSource={() => setOpenManager("dataSources")}
                    onAddGrpah={() => setOpenManager("catalog")}
                />
            </div>
            <div className="bottom">
                <Dashboard />
                {
                    openManagerPage === "dataSources" &&
                    <DataSourceManager
                        dashboardId={dashboard.dashboardId}
                    />
                }
            </div>
        </div>
    );
};

export default DashbaordPage;