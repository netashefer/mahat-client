import EmptyDashboardImage from '../../../images/emptyDashboard.png';
import { CardMedia } from "@mui/material";
import './EmptyDashboard.scss';

const EmptyDashboard = () => {
    return (
        <div className="empty-dashboard-container">
            <div className="empty-dashboard-message">It’s empty here! How about you add something new?</div>
            <CardMedia
                className="empty-image"
                component="img"
                image={EmptyDashboardImage} />
        </div>
    );
};

export default EmptyDashboard;
