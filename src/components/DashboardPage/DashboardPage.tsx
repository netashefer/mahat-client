import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dashabordAtom, dashboardIdAtom } from "../../recoil/dashboard/dashboard";
import { ManagerPanelOptions } from "../../types/dashboard.types";
import withLoader from "../Common/withLoader/withLoader";
import Dashboard from "../Dashboard/Dashboard";
import DashbaordError from "../Errors/DashboardError/DashboardError";
import ManagerDecider from "../ManagerDecider/ManagerDecider";
import ShareLink from "../ShareLink/ShareLink";
import DashboardActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const { dashboardId } = useParams(); // for link sharing 
    const setDashboardId = useSetRecoilState(dashboardIdAtom);
    const dashboard = useRecoilValue(dashabordAtom);
    const [openManagerPage, setOpenManager] = useState<ManagerPanelOptions>(ManagerPanelOptions.none);

    useEffect(() => {
        setDashboardId(dashboardId); // eslint-disable-next-line
    }, []);

    const closeManagerPage = () => setOpenManager(ManagerPanelOptions.none);

    return (
        <div className="dashboard-page">
            {
                dashboard ?
                    <>
                        <div className="dashboard-top">
                            <div className="left-section">
                                <div className="dashboard-title">{dashboard?.dashboardName}</div>
                                <ShareLink />
                            </div>
                            <DashboardActions
                                dashboardId={dashboard?.dashboardId}
                                onAddDataSource={() => setOpenManager(ManagerPanelOptions.dataSources)}
                                onAddGrpah={() => setOpenManager(ManagerPanelOptions.catalog)}
                            />
                        </div>
                        <div className="bottom">
                            <Dashboard />
                            <ManagerDecider
                                closeManagerPage={closeManagerPage}
                                openManagerPage={openManagerPage}
                                dashboardId={dashboard?.dashboardId}
                            />
                        </div>
                    </>
                    : <DashbaordError />
            }
        </div >
    );
};

export default withLoader(DashbaordPage);