import TextField from "@mui/material/TextField";
import DashbaordItem from './DashboardItem/DashboardItem';
import { ReactComponent as Icon } from "../../icons/search.svg";
import './MyDashboards.scss';
import { ChangeEvent, useState } from "react";

const MyDashboards = () => {
    const [searchedValue, setSearchedValue] = useState("");
    const myDashboards = [{ name: "fdsf" }, { name: "bef" }, { name: "bef" }, { name: "bef" }, { name: "dfsdfsd" }];

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
                    myDashboards.
                        filter(d => d.name?.includes(searchedValue))
                        .map(d => <DashbaordItem name={d.name} />)
                }

            </div>

        </div>

    );
};

export default MyDashboards;
