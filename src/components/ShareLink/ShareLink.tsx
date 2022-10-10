
import { Tooltip } from '@mui/material';
import { notifyError, notifySuccess } from '../../helpers/toaster';
import ShareIcon from '@mui/icons-material/Share';
import './ShareLink.scss';

const ShareLink = () => {
    const copyLink = () => {
        const element = document.createElement('input');
        element.value = window.location.href;
        document.body.appendChild(element);
        element.select();
        if (!navigator.clipboard) {
            document.execCommand('copy');
            notifySuccess("The link is copied!");
        } else {
            navigator.clipboard.writeText(element.value).then(() => {
                notifySuccess("The link is copied!");
            }).catch(() => {
                notifyError("We cannot copy the link");
            });
        }
        document.body.removeChild(element);
    };

    return (
        <Tooltip
            placement='top'
            title="copy the dashboard link"
            children={<ShareIcon
                className="share-icon"
                onClick={copyLink}
            />}
        />
    );
};

export default ShareLink;
