import { useState } from 'react';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import GraphWorkshop from '../GraphWorkshop/GraphWorkshop';
import './Catalog.scss';
import ExistingGraphs from './ExistingGraphs/ExistingGraphs';

const Catalog = () => {
	const [shouldOpenGraphWorkshop, setShouldOpenGraphWorkshop] = useState(false);
    return (
        <div className='catalog'>
            <div className='new-graph-section' onClick={() => setShouldOpenGraphWorkshop(true)}>
				<AddIcon className='add-icon' /> 
				Create New Graph
            </div>
            <ExistingGraphs />
			<GraphWorkshop isOpen={shouldOpenGraphWorkshop}/>
        </div>
    );
};

export default Catalog;
