import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import dashboardCommunicator from "../../communication/dashboardCommunicator";
import { ReactComponent as Icon } from "../../icons/search.svg";
import { Dashboard } from "../../types/entities";
import DashboardItem from './DashboardItem/DashboardItem';
import './MyDashboards.scss';

const MyDashboards = () => {
    const [searchedValue, setSearchedValue] = useState("");
    const [myDashboards, setMyDashboards] = useState<Dashboard[]>([]); // need recoil

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
                        <Icon />
                    ),
                }}
                onChange={setSearched}
            />
            <div className="list">
                {
                    myDashboards?.
                        filter(d => d.dashboardName?.includes(searchedValue))
                        .map(d => <DashboardItem
                            dashboardId={d.dashboardId}
                            dashboardName={d.dashboardName}
                        />)
                }
            </div>
        </div>
    );
};

export default MyDashboards;
