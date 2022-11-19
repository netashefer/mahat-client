import { Modal, Typography } from "@mui/material";
import './GraphWorkshop.scss';
import ParametersPanel from "./ParametersPanel/ParametersPanel";

interface GraphWorkshopProps {
	isOpen: boolean,
	isEditMode?: boolean, //in the future :)
}

const GraphWorkshop = ({isOpen, isEditMode}: GraphWorkshopProps) => {
    return (
       <Modal
	   open={isOpen}>
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
