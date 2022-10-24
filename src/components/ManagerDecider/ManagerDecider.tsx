import { ManagerPanelOptions } from '../../types/dashboard.types';
import Catalog from '../Catalog/Catalog';
import ManagerWrapper from '../Common/ManagerWrapper/ManagerWrapper';
import DataSourceManager from '../DataManager/DataSourceManager';

interface ManagerDeciderProps {
    openManagerPage: ManagerPanelOptions;
    closeManagerPage: () => void;
    dashboardId: string;
}

const ManagerDecider = ({ openManagerPage, closeManagerPage, dashboardId }: ManagerDeciderProps) => {

    const getManager = () => {
        switch (openManagerPage) {
            case ManagerPanelOptions.none:
                return null;
            case ManagerPanelOptions.dataSources:
                return <DataSourceManager
                    dashboardId={dashboardId}
                />;
            case ManagerPanelOptions.catalog:
                return <Catalog />;
        }
    };

    return (
        <ManagerWrapper
            closeManagerPage={closeManagerPage}
        >
            {getManager()}
        </ManagerWrapper>
    );
};

export default ManagerDecider;
