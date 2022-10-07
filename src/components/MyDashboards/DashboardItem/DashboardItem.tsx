import { ReactComponent as Trash } from '../../../icons/trash.svg';
import './DashboardItem.scss';

interface DashbaordItemProps {
    name: string;
}

const DashbaordItem = ({ name }: DashbaordItemProps) => {
    return (

        <div className='dashboard-item'>
            <div className='name'>{name}</div>
            <div className='trash-container'>
                <Trash className='trash-icon' />
            </div>
        </div>

    );
};

export default DashbaordItem;
