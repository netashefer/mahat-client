import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { ReactComponent as Trash } from '../../../icons/trash.svg';
import { Dashboard } from '../../../types/entities';
import './DashboardItem.scss';

type DashbaordItemProps = Dashboard;

const DashbaordItem = ({ dashboardName, dashboardId }: DashbaordItemProps) => {

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

export default DashbaordItem;
