import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dashboard } from '../../../types/dashboard.types';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import './DashboardItem.scss';
import { dashabordIdAtom } from '../../../recoil/dashboard/dashboard';

type DashboardItemProps = Dashboard;

const DashboardItem = ({ dashboardName, dashboardId }: DashboardItemProps) => {
    let navigate = useNavigate();
    const setDashboardId = useSetRecoilState(dashabordIdAtom);

    const deleteDashboard = (event: React.MouseEvent<SVGSVGElement>) => {
        dashboardCommunicator.deleteDashboard(dashboardId); // update recoil
        event.stopPropagation();
    };

    const chooseDashboard = () => {
        setDashboardId(dashboardId);
        navigate(`/dashboard/${dashboardId}`);
    };

    return (
        <div className='dashboard-item' onClick={chooseDashboard}>
            <div className='name'>{dashboardName}</div>
            <div className='trash-container'>
                <DeleteIcon className='trash-icon' onClick={deleteDashboard} />
            </div>
        </div>
    );
};

export default DashboardItem;
