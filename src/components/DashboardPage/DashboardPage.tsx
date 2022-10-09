import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dashabordAtom, dashabordIdAtom } from "../../recoil/dashboard/dashboard";
import Dashboard from "../Dashboard/Dashboard";
import DataSourceManager from "../DataManager/DataSourceManager";
import ShareLink from "../ShareLink/ShareLink";
import DashbaordActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const { dashboardId } = useParams(); // for link sharing 
    const setDashboardId = useSetRecoilState(dashabordIdAtom);
    const dashboard = useRecoilValue(dashabordAtom);
    const [openManagerPage, setOpenManager] = useState<"none" | "catalog" | "dataSources">("none");

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