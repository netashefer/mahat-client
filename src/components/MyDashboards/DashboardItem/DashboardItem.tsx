import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { ReactComponent as Trash } from '../../../icons/trash.svg';
import { Dashboard } from '../../../types/entities';
import './DashboardItem.scss';

type DashboardItemProps = Dashboard;

const DashboardItem = ({ dashboardName, dashboardId }: DashboardItemProps) => {
    const deleteDashboard = () => {
        dashboardCommunicator.deleteDashboard(dashboardId); // update recoil
    };

    return (
        <div className='dashboard-item'>
            <div className='name'>{dashboardName}</div>
            <div className='trash-container'>
                <Trash className='trash-icon' onClick={deleteDashboard} />
            </div>
        </div>
    );
};

export default DashboardItem;
