import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecoilCallback } from 'recoil';
import { Dashboard } from '../../../types/dashboard.types';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { dashabordIdAtom } from '../../../recoil/dashboard/dashboard';
import { notifyError } from '../../../helpers/toaster';
import { myDashabordsAtom } from '../../../recoil/dashboard/myDashboards';
import './DashboardItem.scss';

type DashboardItemProps = Dashboard;

const DashboardItem = ({ dashboardName, dashboardId }: DashboardItemProps) => {
    const navigate = useNavigate();
    const setDashboardId = useSetRecoilState(dashabordIdAtom);

    const deleteDashboard = useRecoilCallback(({ set }) => async (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        try {
            await dashboardCommunicator.deleteDashboard(dashboardId); // update recoil
            set(myDashabordsAtom, prev => prev?.filter(d => d.dashboardId !== dashboardId) || []);
        } catch {
            notifyError("We couldn't delete this dashboard");
        }
    }, [dashboardId]);

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
