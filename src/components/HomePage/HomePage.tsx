import CreateNewDashboard from "../CreateNewDashboard/CreateNewDashboard";
import LogoTitle from "../LogoTitle/LogoTitle";
import MyDashboards from "../MyDashboards/MyDashboards";
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="main">
                <LogoTitle size="lr" />
                <div className="content">
                    <MyDashboards />
                    <CreateNewDashboard />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
