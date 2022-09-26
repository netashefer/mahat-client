import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerPanel from "./components/ManagerPanel/ManagerPanel";
import { FullDataInstanceInfo, Table, TableDictionary } from "./types/data";
import './App.scss';
import { AppBar, Toolbar } from "@mui/material";

const App = () => {
  const [tableDictionary, setTableDictionary] = useState<TableDictionary>({});
  const [fullDataInstanceInfo, setFullDataInstanceInfo] = useState<FullDataInstanceInfo>({});
  console.log("Experiment")

  const addDataInstanceTable = (table: Table, info: any) => {
    const dataInstanceId = uuidv4();
    setTableDictionary(prev => {
      return {
        ...prev,
        [dataInstanceId]: table
      }
    })
    setFullDataInstanceInfo(prev => {
      return {
        ...prev,
        [dataInstanceId]: info
      }
    })
  }

  console.log(tableDictionary)

  return (
    <div className="App" id="app">
       <AppBar position="static" className="app-bar">
        <Toolbar>
          Yahel and Neta 
        </Toolbar>
      </AppBar>
      <div className="wrapper">
        <Dashboard />
        <ManagerPanel
          addDataInstanceTable={addDataInstanceTable}
          tableDictionary={tableDictionary}
          fullDataInstanceInfo={fullDataInstanceInfo}
        />
      </div>
    </div>
  );
}

export default App;
