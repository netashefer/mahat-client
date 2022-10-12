import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dashabordAtom, dashabordIdAtom } from "../../recoil/dashboard/dashboard";
import { ManagerPanelOptions } from "../../types/dashboard.types";
import Catalog from "../Catalog/Catalog";
import ManagerWrapper from "../Common/ManagerWrapper/ManagerWrapper";
import withLoader from "../Common/withLoader/withLoader";
import Dashboard from "../Dashboard/Dashboard";
import DataSourceManager from "../DataManager/DataSourceManager";
import ShareLink from "../ShareLink/ShareLink";
import DashboardActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const { dashboardId } = useParams(); // for link sharing 
    const setDashboardId = useSetRecoilState(dashabordIdAtom);
    const dashboard = useRecoilValue(dashabordAtom);
    const [openManagerPage, setOpenManager] = useState<ManagerPanelOptions>(ManagerPanelOptions.none);

    useEffect(() => {
        setDashboardId(dashboardId); // eslint-disable-next-line
    }, []);

    const closeManagerPage = () => setOpenManager(ManagerPanelOptions.none);

    const getManager = () => {
        let Component;
        if (openManagerPage === ManagerPanelOptions.none)
            return null;
        else if (openManagerPage === ManagerPanelOptions.dataSources) {
            Component = <DataSourceManager
                dashboardId={dashboard.dashboardId}
            />;
        } else if (openManagerPage === ManagerPanelOptions.catalog) {
            Component = <Catalog />;
        }

        return <ManagerWrapper closeManagerPage={closeManagerPage}>
            {Component}
        </ManagerWrapper>;
    };

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
                {getManager()}
            </div>
        </div >
    );
};

export default withLoader(DashbaordPage);