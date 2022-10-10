import { useAuth0 } from "@auth0/auth0-react";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import dashboardCommunicator from "../../communication/dashboardCommunicator";
import SearchIcon from '@mui/icons-material/Search';
import { Dashboard } from "../../types/dashboard.types";
import DashboardItem from './DashboardItem/DashboardItem';
import './MyDashboards.scss';

const MyDashboards = () => {
    const [searchedValue, setSearchedValue] = useState("");
    const [myDashboards, setMyDashboards] = useState<Dashboard[]>([]); // need recoil
	const {user} = useAuth0();

	console.log({user})

    useEffect(() => {
        (async () => {
            const dashboards = await dashboardCommunicator.getMyDashboards();
            setMyDashboards(dashboards);
        })();
    }, []);

    const setSearched = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedValue(event.target.value);
    };

    return (
        <div className='my-dashboards'>
            <TextField
                id="outlined-basic"
                variant="standard"
                fullWidth
                color="info"
                label="Search Existing Dashboards"
                InputProps={{
                    startAdornment: (
                        <SearchIcon className="search-icon" />
                    ),
                }}
                onChange={setSearched}
            />
            <div className="list">
                {
                    myDashboards
                        ?.filter(d => d.dashboardName?.includes(searchedValue))
                        .map(d => <DashboardItem
						key={d.dashboardId}
                            dashboardId={d.dashboardId}
                            dashboardName={d.dashboardName}
                        />)
                }
            </div>
        </div>
    );
};

export default MyDashboards;
