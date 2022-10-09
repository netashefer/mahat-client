
import './DataSourceItem.scss';
import { ReactComponent as ReplaceIcon } from '../../../icons/replace-icon.svg';
import { ReactComponent as InfoIcon } from '../../../icons/info.svg';
import { ReactComponent as RemoveIcon } from '../../../icons/x.svg';
import classNames from 'classnames';

interface DataSourceItemProps {
    fileName: string;
    onRemove: () => void;
    onInfo: () => void;
    onReplace: () => void;
}

const DataSourceItem = ({ fileName, onInfo, onRemove, onReplace }: DataSourceItemProps) => {
    return (
        <div className='data-source-container'>
            <RemoveIcon className={classNames('remove-icon', 'data-source-icon')} onClick={onRemove} />
            <div className={'file-name'}>{fileName}</div>
            <InfoIcon className={classNames('info-icon', 'data-source-icon')} onClick={onInfo} />
            <ReplaceIcon className={classNames('replace-icon', 'data-source-icon')} onClick={onReplace} />
        </div>
    );
};

export default DataSourceItem;
