
import { TextField } from '@mui/material';
import { useState } from 'react';
import dashboardCommunicator from '../../communication/dashboardCommunicator';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import './CreateNewDashboard.scss';

const CreateNewDashboard = () => {
    const [newName, setNewName] = useState("");

    const createNewDashboard = () => {
        if (newName?.trim())
            dashboardCommunicator.createNewDashboard({ dashboardName: newName });
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
            />
            <AddIcon className='add-icon' onClick={createNewDashboard} />
        </div>

    );
};

export default CreateNewDashboard;
