import withLoader from "../../components/Common/withLoader/withLoader";
import CreateNewDashboard from "../../components/CreateNewDashboard/CreateNewDashboard";
import LogoTitle from "../../components/LogoTitle/LogoTitle";
import MyDashboards from "../../components/MyDashboards/MyDashboards";
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

export default withLoader(HomePage);
