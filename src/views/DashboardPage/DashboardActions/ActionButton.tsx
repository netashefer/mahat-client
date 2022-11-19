import classNames from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import './ActionButton.scss';
import { Button } from '@mui/material';

interface ActionButtonProps {
    text: string;
    borderColor: "green" | "blue";
    onClick: () => void;
}

const ActionButton = ({ text, onClick, borderColor }: ActionButtonProps) => {
    return (
        <Button className={classNames("action-button", borderColor)} onClick={onClick}>
            <AddIcon className="add-icon" />
            <div className='text'>
                {text}
            </div>
        </Button >
    );
};

export default ActionButton;
