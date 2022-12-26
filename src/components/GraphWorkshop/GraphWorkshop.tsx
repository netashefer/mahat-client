import { Modal } from "@mui/material";
import { Graph } from "../../types/graph.types";
import { setState } from "../../types/utility.types";
import withLoader from "../Common/withLoader/withLoader";
import ParametersPanel from "./ParametersPanel/ParametersPanel";
import './GraphWorkshop.scss';

interface GraphWorkshopProps {
	isOpen: boolean,
	onClose: setState<any>,
	graphToEdit?: Graph,
}

const GraphWorkshop = ({ isOpen, graphToEdit, onClose }: GraphWorkshopProps) => {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}>
			<div className='graph-workshop-modal'>
				<div className="creation-section">
					<div className="title">
						{!graphToEdit ? 'Create A New Graph' : 'Edit An Existing Graph'}
					</div>
					<ParametersPanel graphToEdit={graphToEdit} onClose={onClose} />
				</div>
			</div>
		</Modal>
	);
};

export default withLoader(GraphWorkshop);
