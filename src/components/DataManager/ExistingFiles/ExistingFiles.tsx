import { useRecoilState } from 'recoil';
import excelCommunicator from '../../../communication/excelCommunicator';
import { notifyError } from '../../../helpers/toaster';
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
    const [dashboardDataSources, setDashboardDataSources] = useRecoilState(dataSourcesAtom);

    const deleteDateSource = async (dataSource: DataSourceIdentifiers) => {
        try {
            await excelCommunicator.deleteDateSource(dataSource.dataSourceId);
            setDashboardDataSources(prev => prev.filter(d => d.dataSourceId !== dataSource.dataSourceId));
        } catch {
            notifyError("We cannot delete this data source");
        }
    };

    return (
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
    );
};

export default withLoader(ExistingFiles);