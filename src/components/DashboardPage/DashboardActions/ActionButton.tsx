import classNames from 'classnames';
import { ReactComponent as PlusIcon } from '../../../icons/plus.svg';
import './ActionButton.scss';

interface ActionButtonProps {
    text: string;
    borderColor: "green" | "blue";
    onClick: () => void;
}

const ActionButton = ({ text, onClick, borderColor }: ActionButtonProps) => {
    return (
        <div className={classNames("action-button", borderColor)} onClick={onClick}>
            <PlusIcon className="add-icon" />
            <div className='text'>
                {text}
            </div>
        </div >
    );
};

export default ActionButton;
