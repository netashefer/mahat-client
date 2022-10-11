import { ReactComponent as AddIcon } from '../../icons/add.svg';
import ExistingGraphs from './ExistingGraphs/ExistingGraphs';
import './Catalog.scss';

const Catalog = () => {
    return (
        <div className='catalog'>
            <div className='new-graph-section'>
                <AddIcon className='add-icon' />
                <div>Create New Graph</div>
            </div>
            <ExistingGraphs />
        </div>
    );
};

export default Catalog;
