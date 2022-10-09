import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import dashboardCommunicator from '../../../communication/dashboardCommunicator';
import { ReactComponent as InfoIcon } from '../../../icons/info.svg';
import ActionButton from "./ActionButton";
import './DashboardActions.scss';

interface DashbaordActionsProps {
    onAddGrpah: () => void;
    onAddDataSource: () => void;
    dashboardId: string;
}

const DashboardActions = ({ dashboardId, onAddDataSource, onAddGrpah }: DashbaordActionsProps) => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        (async () => {
            const count = await dashboardCommunicator.getDashboardUserCount(dashboardId);
            setUserCount(count);
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
