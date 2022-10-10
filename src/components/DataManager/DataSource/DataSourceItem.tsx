
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import { ReactComponent as ReplaceIcon } from '../../../icons/replace-icon.svg';
import './DataSourceItem.scss';

interface DataSourceItemProps {
    fileName: string;
    onRemove: () => void;
    onInfo: () => void;
    onReplace: () => void;
}

const DataSourceItem = ({ fileName, onInfo, onRemove, onReplace }: DataSourceItemProps) => {
    return (
        <div className='data-source-container'>
            <Tooltip
                title="remove"
                placement="left"
                children={<ClearIcon
                    className={classNames('remove-icon', 'data-source-icon')}
                    onClick={onRemove}
                />}
            />
            <div className={'file-name'}>{fileName}</div>
            <Tooltip
                title="info"
                placement="top"
                children={<InfoIcon
                    className={classNames('info-icon', 'data-source-icon')}
                    onClick={onInfo}
                />}
            />
            <Tooltip
                title="replace"
                placement="top"
                children={<ReplaceIcon
                    className={classNames('replace-icon', 'data-source-icon')}
                    onClick={onReplace}
                />}
            />
        </div>
    );
};

export default DataSourceItem;
