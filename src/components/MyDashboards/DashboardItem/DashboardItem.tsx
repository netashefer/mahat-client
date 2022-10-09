import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { ReactComponent as Trash } from '../../../icons/trash.svg';
import { Dashboard } from '../../../types/entities';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import './DashboardItem.scss';
import { dashabordIdAtom } from '../../../recoil/dashboard/dashboard';

type DashboardItemProps = Dashboard;

const DashboardItem = ({ dashboardName, dashboardId }: DashboardItemProps) => {
    let navigate = useNavigate();
    const setDashboardId = useSetRecoilState(dashabordIdAtom);

    const deleteDashboard = () => {
        dashboardCommunicator.deleteDashboard(dashboardId); // update recoil
    };

    const chooseDashboard = () => {
        setDashboardId(dashboardId);
        navigate(`/dashboard/${dashboardId}`);
    };

    return (
        <div className='dashboard-item' onClick={chooseDashboard}>
            <div className='name'>{dashboardName}</div>
            <div className='trash-container'>
                <Trash className='trash-icon' onClick={deleteDashboard} />
            </div>
        </div>
    );
};

export default DashboardItem;
