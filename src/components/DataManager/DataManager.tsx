
import { noop } from 'lodash';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { dataSourcesAtom } from '../../recoil/dataSources/dataSources';
import { DataSource } from '../../types/entities';
import ExcelReader from '../ExcelReader/ExcelReader';
import DataSourceItem from './DataSource/DataSourceItem';
import DataSourceSchemaContainer from './DataSourceSchemaContainer/DataSourceSchemaContainer';
import './DataManager.scss';

interface DataManagerProps {
    dashboardId: string;
}

const DataSourceManager = ({ dashboardId }: DataManagerProps) => {
    const [clickedDataSource, setClickedDataSource] = useState<DataSource>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const dashboardDataSources = useRecoilValue(dataSourcesAtom);

    const pickDataSource = (dataSource: DataSource) => {
        setClickedDataSource(dataSource);
        setIsOpen(true);
    };
    return (
        <div
            className="data-sources-manager"
        >
            <div className='title'>Upload New File</div>
            <DataSourceSchemaContainer
                modalIsOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                dataSourceId={clickedDataSource?.dataSourceId}
                filename={clickedDataSource?.displayName}
            />

            <ExcelReader dashboardId={dashboardId} />
            <div className='existing-files'>
                <div className='title'>Existing Files</div>
                {
                    dashboardDataSources.map(dataSource =>
                        <DataSourceItem
                            fileName={dataSource.displayName}
                            onInfo={() => pickDataSource(dataSource)}
                            onRemove={noop}
                            onReplace={noop}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default DataSourceManager; // add withLoader - office
