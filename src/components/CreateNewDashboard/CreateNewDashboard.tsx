
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import { notifyError, notifyInfo, notifySuccess } from '../../helpers/toaster';
import { myDashabordsAtom } from '../../recoil/dashboard/myDashboards';
import './CreateNewDashboard.scss';
import { useAuth0 } from '@auth0/auth0-react';

const CreateNewDashboard = () => {
    const [newName, setNewName] = useState("");
    const { user } = useAuth0();

    const createNewDashboard = useRecoilCallback(({ set }) => async () => {
        if (newName?.trim()) {
            try {
                const dashboardId = await dashboardCommunicator.createNewDashboard({ dashboardName: newName });
                await dashboardCommunicator.addDashboardPermissions(dashboardId, user.nickname);
                set(myDashabordsAtom(user.nickname), prev => [{ dashboardName: newName, dashboardId }, ...(prev || [])]);
                setNewName("");
                notifySuccess("Your dashboard created successfully");
            } catch {
                notifyError("Couldn't create a dashboard, try again");
            }
        } else {
            notifyInfo("You must insert a name");
        }
    }, [newName, setNewName, user]);

    return (
        <div className='create-new-dashboard'>
            <div className='title'>Create New Dashboard</div>
            <TextField
                className='name-text-field'
                id="outlined-basic"
                label="give it a new Name!"
                variant="outlined"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
            />
            <AddIcon className='add-icon' onClick={createNewDashboard} />
        </div>

    );
};

export default CreateNewDashboard;
