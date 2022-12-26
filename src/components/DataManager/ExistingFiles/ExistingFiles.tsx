import { useRecoilValue } from 'recoil';
import { useRemoveDataSource } from '../../../recoil/customHooks/useDataSourceHandler';
import { dataSourcesAtom } from '../../../recoil/dataSources/dataSources';
import { DataSourceIdentifiers } from '../../../types/dataSource.types';
import withLoader from '../../Common/withLoader/withLoader';
import DataSourceItem from '../DataSource/DataSourceItem';
import './ExistingFiles.scss';

interface ExistingFilesProps {
    replaceDataSource: (dataSource: DataSourceIdentifiers) => void;
    pickDataSource: (dataSource: DataSourceIdentifiers) => void;
}

const ExistingFiles = ({ pickDataSource, replaceDataSource }: ExistingFilesProps) => {
    const dashboardDataSources = useRecoilValue(dataSourcesAtom);
    const deleteDateSource = useRemoveDataSource();

    return (
        <div className='existing-files'>
            <div className='title'>Existing Files</div>
            {
                dashboardDataSources.map(dataSource =>
                    <DataSourceItem
                        key={dataSource.dataSourceId}
                        fileName={dataSource.displayName}
                        onInfo={() => pickDataSource(dataSource)}
                        onRemove={() => deleteDateSource(dataSource?.dataSourceId)}
                        onReplace={() => replaceDataSource(dataSource)}
                    />
                )
            }
        </div>
    );
};

export default withLoader(ExistingFiles);