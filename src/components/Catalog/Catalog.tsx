import { ReactComponent as AddIcon } from '../../icons/add.svg';
import ExistingGraphs from './ExistingGraphs/ExistingGraphs';
import './Catalog.scss';
import { useState } from 'react';
import GraphWorkshop from '../GraphWorkshop/GraphWorkshop';
import { Button } from '@mui/material';

const Catalog = () => {
	const [shouldOpenGraphWorkshop, setShouldOpenGraphWorkshop] = useState(false);
    return (
        <div className='catalog'>
            <div className='new-graph-section' >
				<Button className='new-graph-button'>
				<AddIcon className='add-icon' onClick={() => setShouldOpenGraphWorkshop(true)}/> 
					Create New Graph
				</Button>
            </div>
            <ExistingGraphs />
			<GraphWorkshop isOpen={shouldOpenGraphWorkshop}/>
        </div>
    );
};

export default Catalog;
