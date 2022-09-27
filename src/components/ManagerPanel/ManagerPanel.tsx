
import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames';
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { FullDataInstanceInfo, Table, TableDictionary } from '../../types/data';
import Catalog from '../Catalog/Catalog';

import DataManager from '../DataManager/DataManager';
import './ManagerPanel.scss';

interface ManagerPanelProps {
    addDataInstanceTable: (table: Table, info: any) => void;
    tableDictionary: TableDictionary;
    fullDataInstanceInfo: FullDataInstanceInfo;
}


const ManagerPanel = ({ addDataInstanceTable, tableDictionary, fullDataInstanceInfo }: ManagerPanelProps) => {
    const [currentContent, setCurrentContent] = useState<number>(0);

    const getChildren = () => {
        switch (currentContent) {
            case 0:
                return <Catalog />;
            case 1:
                return <DataManager
                    tableDictionary={tableDictionary}
                    addDataInstanceTable={addDataInstanceTable}
                    fullDataInstanceInfo={fullDataInstanceInfo}
                />;
            default:
                return <div>not yet :)</div>;
        }
    };

    const buttons = [
        {
            content: "1",
            tooltipText: "קטלוג",
            number: 0
        },
        {
            content: "2",
            tooltipText: "ניהול המידע",
            number: 1
        }, {
            content: "3",
            tooltipText: "יוזר",
            number: 2
        }
    ];

    return (
        <div className='manager-panel'>
            <div className='left-buttons-panel'>
                <ReactTooltip />
                {
                    buttons.map((btn, index) =>
                        <Tooltip key={index} title={btn.tooltipText} placement="left">
                            <button
                                onClick={() => setCurrentContent(btn.number)}
                                className={classNames('panel-btn', { "selected": currentContent === btn.number })}>
                                {btn.content}
                            </button>
                        </Tooltip>
                    )}
            </div>
            <div className='panel-content'>
                {getChildren()}
            </div>
        </div>
    );
};

export default ManagerPanel;
