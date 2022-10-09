import Modal from 'react-modal';
import DataSourceSchema from './DataSourceSchema';

interface DataInstanceInfoContainerProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    dataSourceId: string;
    filename: string;
}

const DataSourceSchemaContainer = ({ closeModal, dataSourceId, filename, modalIsOpen }: DataInstanceInfoContainerProps) => {
    const customStyles: Modal.Styles = {
        content: {
            backgroundColor: "#202342",
            borderRadius: '10px',
            color: 'white',
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
            <DataSourceSchema
                dataSourceId={dataSourceId}
                filename={filename}
            />
        </Modal>
    );

};

export default DataSourceSchemaContainer;