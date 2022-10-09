
import { Tooltip } from '@mui/material';
import { notifyError, notifySuccess } from '../../helpers/toaster';
import { ReactComponent as ShareIcon } from '../../icons/share.svg';
import './ShareLink.scss';

const ShareLink = () => {
    const copyLink = () => {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        if (!navigator.clipboard) {
            document.execCommand('copy');
            notifySuccess("the link is copied!");
        } else {
            navigator.clipboard.writeText(el.value).then(() => {
                notifySuccess("the link is copied!");
            }).catch(() => {
                notifyError("we cannot copy the link");
            });
        }
        document.body.removeChild(el);
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
