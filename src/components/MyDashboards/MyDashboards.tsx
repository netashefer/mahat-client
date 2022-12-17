import { useAuth0 } from '@auth0/auth0-react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { useRecoilValue } from 'recoil';
import { myDashabordsAtom } from "../../recoil/dashboard/myDashboards";
import DashboardItem from './DashboardItem/DashboardItem';
import './MyDashboards.scss';

const MyDashboards = () => {
    const { user } = useAuth0();
    const [searchedValue, setSearchedValue] = useState("");
    const myDashboards = useRecoilValue(myDashabordsAtom(user.nickname));

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
