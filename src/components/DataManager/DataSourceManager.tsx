import RefreshIcon from '@mui/icons-material/Refresh';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { DataSourceIdentifiers, FileUploadStage } from '../../types/dataSource.types';
import ExcelReader from '../ExcelReader/ExcelReader';
import DataSourceSchemaContainer from './DataSourceSchemaContainer/DataSourceSchemaContainer';
import ExistingFiles from './ExistingFiles/ExistingFiles';
import './DataSourceManager.scss';

interface DataSourceManagerProps {
    dashboardId: string;
}

const DataSourceManager = ({ dashboardId }: DataSourceManagerProps) => {
    const [clickedDataSource, setClickedDataSource] = useState<DataSourceIdentifiers>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [fileUploadStage, setFileUploadStage] = useState<FileUploadStage>(FileUploadStage.add);
    const [dataSourceIdToReplace, setDataSourceIdToReplace] = useState("");

    const pickDataSource = (dataSource: DataSourceIdentifiers) => {
        setClickedDataSource(dataSource);
        setIsOpen(true);
    };

    const replaceDataSource = (dataSource: DataSourceIdentifiers) => {
        setFileUploadStage(FileUploadStage.replace);
        setDataSourceIdToReplace(dataSource.dataSourceId);
    };

    const resetDataSourceReplacement = () => {
        setFileUploadStage(FileUploadStage.add);
        setDataSourceIdToReplace(null);
    };

    return (
        <div className="data-sources-manager" >
            <div className='upper-section'>
                {
                    fileUploadStage !== FileUploadStage.add &&
                    <Tooltip
                        title="back to adding"
                        children={<RefreshIcon className='back-icon' onClick={resetDataSourceReplacement} />}
                    />
                }
                <div className='title'>{fileUploadStage === FileUploadStage.add ? "Upload New File" : "Replace File"}</div>
            </div>
            <DataSourceSchemaContainer
                modalIsOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                dataSourceId={clickedDataSource?.dataSourceId}
                filename={clickedDataSource?.displayName}
            />
            <ExcelReader
                dashboardId={dashboardId}
                fileUploadStage={fileUploadStage}
                setFileUploadStage={setFileUploadStage}
                dataSourceIdToReplace={dataSourceIdToReplace}
            />
            <ExistingFiles
                replaceDataSource={replaceDataSource}
                pickDataSource={pickDataSource}
            />
        </div>
    );
};

export default DataSourceManager;