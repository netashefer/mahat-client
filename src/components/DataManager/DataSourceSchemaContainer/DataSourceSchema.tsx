import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import excelCommunicator from '../../../communication/excelCommunicator';
import './DataSourceSchema.scss';

interface DataInstanceInfoContainerProps {
    dataSourceId: string;
    filename: string;
}

const DataSourceSchema = ({ dataSourceId, filename }: DataInstanceInfoContainerProps) => {
    const [schema, setSchema] = useState<string[]>();

    const getDataSourceSchema = async () => {
        const schema = await excelCommunicator.getschema(dataSourceId);
        setSchema(schema);
    };

    useEffect(() => {
        if (dataSourceId)
            getDataSourceSchema();
        return () => {
            setSchema(null);
        }; //eslint-disable-next-line
    }, []);

    return (
        <div className='data-source-schema'>
            {
                schema ?
                    <>
                        <b>File Schema Information: {filename || "No file Found"}</b>
                        <div className='items'>
                            {
                                schema?.map((s, index) =>
                                    <li key={index}>{s}</li>)
                            }
                        </div>
                    </>
                    : <CircularProgress />
            }
        </div>
    );

};

export default DataSourceSchema;