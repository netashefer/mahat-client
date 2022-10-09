import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import excelCommunicator from '../../../communication/excelCommunicator';

interface DataInstanceInfoContainerProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    dataSourceId: string;
    filename: string;
}

const DataSourceSchemaContainer = ({ closeModal, dataSourceId, filename, modalIsOpen }: DataInstanceInfoContainerProps) => {
    const [schema, setSchema] = useState<string[]>();
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

    const getDataSourceSchema = async () => {
        const schema = await excelCommunicator.getschema(dataSourceId);
        setSchema(schema);
    };

    useEffect(() => {
        if (dataSourceId)
            getDataSourceSchema(); //eslint-disable-next-line
    }, [dataSourceId]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <b>File Schema Information: {filename || "No file Found"}</b>
            {schema?.map((s, index) =>
                <li key={index}>{s}</li>)}
        </Modal>
    );

};

export default DataSourceSchemaContainer;