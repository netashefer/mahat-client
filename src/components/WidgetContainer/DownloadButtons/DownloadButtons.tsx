import PhotoIcon from '@mui/icons-material/Photo';
import classNames from 'classnames';
import { ReactComponent as SVGIcon } from '../../../icons/csv.svg';
import './DownloadButtons.scss';

export interface DownloadButtonProps {
    handleDownload: () => void;
    className?: string;
}

export const DownloadImageButton = ({ handleDownload, className }: DownloadButtonProps) => {
    return <PhotoIcon className={classNames('download-button', 'download-image', className)} onClick={handleDownload} />;
};

export const DownloadCsvButton = ({ handleDownload, className }: DownloadButtonProps) => {
    return <SVGIcon className={classNames('download-button', 'download-csv', className)} onClick={handleDownload} />;
};