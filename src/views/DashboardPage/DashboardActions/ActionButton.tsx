import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import classNames from 'classnames';
import './ActionButton.scss';

interface ActionButtonProps {
    text: string;
    borderColor: "green" | "blue";
    onClick: () => void;
    Icon?: React.ComponentType<{ className: string; }>;
}

const ActionButton = ({ text, onClick, borderColor, Icon = AddIcon }: ActionButtonProps) => {
    return (
        <Button className={classNames("action-button", borderColor)} onClick={onClick}>
            <Icon className="add-icon" />
            <div className='text'>
                {text}
            </div>
        </Button >
    );
};

export default ActionButton;
