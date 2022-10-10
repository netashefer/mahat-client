import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { notifyError } from '../../../helpers/toaster';
import InfoIcon from '@mui/icons-material/Info';
import ActionButton from "./ActionButton";
import './DashboardActions.scss';

interface DashboardActionsProps {
    onAddGrpah: () => void;
    onAddDataSource: () => void;
    dashboardId: string;
}

const DashboardActions = ({ dashboardId, onAddDataSource, onAddGrpah }: DashboardActionsProps) => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const count = await dashboardCommunicator.getDashboardUserCount(dashboardId);
                setUserCount(count);
            } catch {
                notifyError("Couldnt get count of users");
            }
        })(); // eslint-disable-next-line
    }, []);

    const tooltipComponent = <div className='tooltip-text'>
        number of users of this dashboard is {userCount}
    </div>;

    return (
        <div className="dashboard-actions">
            <Tooltip title={tooltipComponent} placement="bottom" >
                <InfoIcon className='info-icon' />
            </Tooltip>
            <ActionButton text="Add graph" onClick={onAddGrpah} borderColor="green" />
            <ActionButton text="Add data source" onClick={onAddDataSource} borderColor="blue" />
        </div>
    );
};

export default DashboardActions;
