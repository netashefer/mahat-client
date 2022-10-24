import ClearIcon from '@mui/icons-material/Clear';
import './ManagerWrapper.scss';

const ManagerWrapper = ({ children, closeManagerPage }: { children: JSX.Element; closeManagerPage: () => void; }) => {

    return (
        children ?
            <div className='manager-wrapper'>
                <ClearIcon className='close-icon' onClick={closeManagerPage} />
                {children}
            </div>
            : null
    );
};

export default ManagerWrapper;
