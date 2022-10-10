import { useState } from 'react';
import { useRecoilState } from 'recoil';
import excelCommunicator from '../../communication/excelCommunicator';
import { notifyError } from '../../helpers/toaster';
import { dataSourcesAtom } from '../../recoil/dataSources/dataSources';
import { DataSourceIdentifiers, FileUploadStage } from '../../types/dataSource.types';
import ExcelReader from '../ExcelReader/ExcelReader';
import DataSourceItem from './DataSource/DataSourceItem';
import DataSourceSchemaContainer from './DataSourceSchemaContainer/DataSourceSchemaContainer';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Tooltip } from '@mui/material';
import './DataSourceManager.scss';

interface DataManagerProps {
    dashboardId: string;
}

const DataSourceManager = ({ dashboardId }: DataManagerProps) => {
    const [clickedDataSource, setClickedDataSource] = useState<DataSourceIdentifiers>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [fileUploadStage, setFileUploadStage] = useState<FileUploadStage>(FileUploadStage.add);
    const [dataSourceIdToReplace, setDataSourceIdToReplace] = useState("");
    const [dashboardDataSources, setDashboardDataSources] = useRecoilState(dataSourcesAtom);

    const pickDataSource = (dataSource: DataSourceIdentifiers) => {
        setClickedDataSource(dataSource);
        setIsOpen(true);
    };

    const deleteDateSource = async (dataSource: DataSourceIdentifiers) => {
        try {
            await excelCommunicator.deleteDateSource(dataSource.dataSourceId);
            setDashboardDataSources(prev => prev.filter(d => d.dataSourceId !== dataSource.dataSourceId));
        } catch {
            notifyError("We cannot delete this data source");
        }
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
            <div className='existing-files'>
                <div className='title'>Existing Files</div>
                {
                    dashboardDataSources.map(dataSource =>
                        <DataSourceItem
                            fileName={dataSource.displayName}
                            onInfo={() => pickDataSource(dataSource)}
                            onRemove={() => deleteDateSource(dataSource)}
                            onReplace={() => replaceDataSource(dataSource)}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default DataSourceManager; // add withLoader - office