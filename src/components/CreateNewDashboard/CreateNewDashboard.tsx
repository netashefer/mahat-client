
import { TextField } from '@mui/material';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import './CreateNewDashboard.scss';

const CreateNewDashboard = () => {
    return (

        <div className='create-new-dashboard'>
            <div className='title'>Create New Dashboard</div>
            <TextField
                className='name-text-field'
                id="outlined-basic"
                label="give it a new Name!"
                variant="outlined" />
            <AddIcon className='add-icon' />
        </div>

    );
};

export default CreateNewDashboard;
