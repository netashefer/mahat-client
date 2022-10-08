import CreateNewDashboard from "../CreateNewDashboard/CreateNewDashboard";
import LogoTitle from "../LogoTitle/LogoTitle";
import MyDashboards from "../MyDashboards/MyDashboards";
import TopBar from "../TopBar/TopBar";
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <TopBar />
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
