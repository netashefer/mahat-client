import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { notifyError } from '../../../helpers/toaster';
import { dashboardIdAtom } from '../../../recoil/dashboard/dashboard';
import { myDashabordsAtom } from '../../../recoil/dashboard/myDashboards';
import './DashboardItem.scss';

type DashboardItemProps = {
    dashboardName: string;
    dashboardId?: string;
};

const DashboardItem = ({ dashboardName, dashboardId }: DashboardItemProps) => {
    const navigate = useNavigate();
    const setDashboardId = useSetRecoilState(dashboardIdAtom);
    const { user } = useAuth0();

    const deleteDashboard = useRecoilCallback(({ set }) => async (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        try {
            await dashboardCommunicator.deleteDashboard(dashboardId);
            set(myDashabordsAtom(user.nickname), prev => prev?.filter(d => d.dashboardId !== dashboardId) || []);
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
