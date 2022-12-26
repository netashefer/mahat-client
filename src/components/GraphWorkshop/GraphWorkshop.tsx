import { Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Graph } from "../../types/graph.types";
import ParametersPanel from "./ParametersPanel/ParametersPanel";
import './GraphWorkshop.scss';

interface GraphWorkshopProps {
	isOpen: boolean,
	onClose: Dispatch<SetStateAction<any>>,
	graphToEdit?: Graph,
}

const GraphWorkshop = ({isOpen, graphToEdit, onClose}: GraphWorkshopProps) => {
    return (
       <Modal 
	   open={isOpen}
	   onClose={onClose}>
		<div className='graph-workshop-modal'>
			<div className="creation-section">
				<div className="title">
				{!graphToEdit ? 'Create A New Graph' : 'Edit An Existing Graph'}
				</div>
				<ParametersPanel graphToEdit={graphToEdit}/>
			</div>
		</div>
	   </Modal>
    );
};

export default GraphWorkshop;
