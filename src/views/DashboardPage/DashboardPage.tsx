import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import withLoader from "../../components/Common/withLoader/withLoader";
import Dashboard from "../../components/Dashboard/Dashboard";
import DashbaordError from "../../components/Errors/DashboardError/DashboardError";
import ManagerDecider from "../../components/ManagerDecider/ManagerDecider";
import ShareLink from "../../components/ShareLink/ShareLink";
import { dashboardIdAtom, dashboardAtom } from "../../recoil/dashboard/dashboard";
import { ManagerPanelOptions } from "../../types/dashboard.types";
import DashboardActions from "./DashboardActions/DashboardActions";
import './DashboardPage.scss';

const DashbaordPage = () => {
    const { dashboardId } = useParams(); // for link sharing 
    const setDashboardId = useSetRecoilState(dashboardIdAtom);
    const dashboard = useRecoilValue(dashboardAtom);
    const [openManagerPage, setOpenManager] = useState<ManagerPanelOptions>(ManagerPanelOptions.none);

	const openAndCloseManagerPage = (managerPanelOption: ManagerPanelOptions) => {
		if(openManagerPage !== ManagerPanelOptions.none){
			setOpenManager(ManagerPanelOptions.none)
		} else {
			setOpenManager(managerPanelOption);
		}
	}

    useEffect(() => {
        setDashboardId(dashboardId); // eslint-disable-next-line
    }, []);

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
                                onAddDataSource={() => openAndCloseManagerPage(ManagerPanelOptions.dataSources)}
                                onAddGrpah={() => openAndCloseManagerPage(ManagerPanelOptions.catalog)}
                            />
                        </div>
                        <div className="bottom">
                            <Dashboard />
                            <ManagerDecider
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