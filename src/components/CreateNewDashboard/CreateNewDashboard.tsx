
import { TextField } from '@mui/material';
import { useState } from 'react';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import { notifyError, notifyInfo, notifySuccess } from '../../helpers/toaster';
import './CreateNewDashboard.scss';

const CreateNewDashboard = () => {
    const [newName, setNewName] = useState("");

    const createNewDashboard = async () => {
        if (newName?.trim()) {
            try {
                // should also insert to permmisions
                await dashboardCommunicator.createNewDashboard({ dashboardName: newName });
                setNewName("");
                notifySuccess("your dashboard created successfully");
            } catch {
                notifyError("couldn't create a dashboard, try again");
            }
        } else {
            notifyInfo("you must insert a name");
        }
    };

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
