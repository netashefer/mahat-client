import PhotoIcon from '@mui/icons-material/Photo';
import classNames from 'classnames';
import { ReactComponent as SVGIcon } from '../../../icons/csv.svg';
import './DownloadButtons.scss';

export interface DownloadButtonProps {
    handleDownload: () => void;
}

export const DownloadImageButton = ({ handleDownload }: DownloadButtonProps) => {
    return <PhotoIcon className={classNames('download-button', 'download-image')} onClick={handleDownload} />;
};

export const DownloadCsvButton = ({ handleDownload }: DownloadButtonProps) => {
    return <SVGIcon className={classNames('download-button', 'download-csv')} onClick={handleDownload} />;
};