
import { useState } from 'react';
import { ReactComponent as InfoIcon } from '../../icons/info.svg';
import { FullDataInstanceInfo, Table, TableDictionary } from '../../types/data';
import { DataInstanceId } from '../../types/entities';
import ExcelReader from '../ExcelReader/ExcelReader';
import DataInstanceInfoContainer from './DataInstanceInfo/DataInstanceInfo';
import './DataManager.scss';

interface DataManagerProps {
    tableDictionary: TableDictionary;
    addDataInstanceTable: (table: Table, info: any) => void;
    fullDataInstanceInfo: FullDataInstanceInfo;
}

const DataManager = ({ tableDictionary, addDataInstanceTable, fullDataInstanceInfo }: DataManagerProps) => {
    const [clickedDataInstance, setClickedDataInstance] = useState<DataInstanceId>();
    const [modalIsOpen, setIsOpen] = useState(false);

    const currentDataInstanceInfo = fullDataInstanceInfo[clickedDataInstance];
    const currentDataInstanceTable = tableDictionary[clickedDataInstance];

    const pickDataInstance = (dataInstanceId: DataInstanceId) => {
        setClickedDataInstance(dataInstanceId);
        setIsOpen(true);
    };
    return (
        <div
            className="data-manager"
        >
            <h1>ניהול מידע</h1>
            <DataInstanceInfoContainer
                modalIsOpen={modalIsOpen}
                closeModal={() => setIsOpen(false)}
                currentDataInstanceInfo={currentDataInstanceInfo}
                currentDataInstanceTable={currentDataInstanceTable}
            />

            {Object.entries(fullDataInstanceInfo).map(([dataInstanceId, info]) =>
                <li key={dataInstanceId}>
                    {info.name}
                    <InfoIcon
                        className='info-icon'
                        onClick={() => pickDataInstance(dataInstanceId)}
                    />
                </li>
            )}
            <ExcelReader addDataInstanceTable={addDataInstanceTable} />
        </div>
    );
};

export default DataManager;
