import { Modal } from "@mui/material";
import ParametersPanel from "./ParametersPanel/ParametersPanel";
import './GraphWorkshop.scss';
import { Dispatch, SetStateAction } from "react";

interface GraphWorkshopProps {
	isOpen: boolean,
	onClose: Dispatch<SetStateAction<any>>,
	isEditMode?: boolean, //in the future :)
}

const GraphWorkshop = ({isOpen, isEditMode, onClose}: GraphWorkshopProps) => {
    return (
       <Modal 
	   open={isOpen}
	   onClose={onClose}>
		<div className='graph-workshop-modal'>
			<div className="creation-section">
				<div className="title">
				{!isEditMode ? 'Create A New Graph' : 'Edit An Existing Graph'}
				</div>
				<ParametersPanel/>
			</div>
		</div>
	   </Modal>
    );
};

export default GraphWorkshop;
