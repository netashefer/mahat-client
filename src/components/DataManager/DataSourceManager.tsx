
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import excelCommunicator from '../../communication/excelCommunicator';
import { notifyError } from '../../helpers/toaster';
import { dataSourcesAtom } from '../../recoil/dataSources/dataSources';
import { DataSource } from '../../types/entities';
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
    const [clickedDataSource, setClickedDataSource] = useState<DataSource>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(true);
    const [dataSourceIdToReplace, setDataSourceIdToReplace] = useState("");
    const [dashboardDataSources, setDashboardDataSources] = useRecoilState(dataSourcesAtom);


    const pickDataSource = (dataSource: DataSource) => {
        setClickedDataSource(dataSource);
        setIsOpen(true);
    };

    const deleteDateSource = async (dataSource: DataSource) => {
        try {
            await excelCommunicator.deleteDateSource(dataSource.dataSourceId);
            setDashboardDataSources(prev => prev.filter(d => d.dataSourceId !== dataSource.dataSourceId));
        } catch {
            notifyError("we cannot delete this data source");
        }
    };

    const replaceDataSource = (dataSource: DataSource) => {
        setIsAdding(false);
        setDataSourceIdToReplace(dataSource.dataSourceId);
    };

    const resetReplacement = () => {
        setIsAdding(true);
        setDataSourceIdToReplace(null);
    };

    return (
        <div className="data-sources-manager" >
            <div className='upper-section'>
                {
                    !isAdding &&
                    <Tooltip
                        title="back to adding"
                        children={<RefreshIcon className='back-icon' onClick={resetReplacement} />}
                    />
                }
                <div className='title'>{isAdding ? "Upload New File" : "Replace File"}</div>
            </div>
            <DataSourceSchemaContainer
                modalIsOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                dataSourceId={clickedDataSource?.dataSourceId}
                filename={clickedDataSource?.displayName}
            />
            <ExcelReader
                dashboardId={dashboardId}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
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
