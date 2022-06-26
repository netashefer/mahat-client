
import { useState } from 'react';
import { Table } from '../../types/data';
import Catalog from '../Catalog/Catalog';
import ExcelReader from '../ExcelReader/ExcelReader';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import './ManagerPanel.scss';

interface ManagerPanelProps {
    addDataInstanceTable: (table: Table) => void;

}


const ManagerPanel = ({ addDataInstanceTable }: ManagerPanelProps) => {
    const [currentContent, setCurrentContent] = useState<number>(0);

    const getChildren = () => {
        switch (currentContent) {
            case 0:
                return <Catalog />
            case 1:
                return <ExcelReader addDataInstanceTable={addDataInstanceTable} />
            default:
                return <div>not yet :)</div>
        }
    }

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
    ]

    return (
        <div className='manager-panel'>
            <div className='left-buttons-panel'>
                <ReactTooltip />
                {
                    buttons.map(btn =>
                        <button
                            data-place="left"
                            data-tip={btn.tooltipText}
                            onClick={() => setCurrentContent(btn.number)}
                            className={classNames('panel-btn', { "selected": currentContent === btn.number })}>
                            {btn.content}
                        </button>
                    )}
            </div>
            <div className='panel-content'>
                {getChildren()}
            </div>
        </div>
    );
}

export default ManagerPanel;
