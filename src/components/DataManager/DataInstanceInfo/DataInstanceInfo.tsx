import Modal from 'react-modal';
import { DataInstanceInfo, Table } from '../../../types/data';

interface DataInstanceInfoContainerProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    currentDataInstanceInfo: DataInstanceInfo;
    currentDataInstanceTable: Table;
}

const DataInstanceInfoContainer = ({ closeModal, currentDataInstanceInfo, currentDataInstanceTable, modalIsOpen }: DataInstanceInfoContainerProps) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div>מידע על האקסל {currentDataInstanceInfo?.name || "לא נבחר קובץ"}</div>
            <div>סכמה:</div>
            {currentDataInstanceTable?.schema.map((s, index) => <div key={index}>{s}</div>)}
        </Modal>
    )

}

export default DataInstanceInfoContainer;