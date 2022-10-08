import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerPanel from "./components/ManagerPanel/ManagerPanel";
import { FullDataInstanceInfo, Table, TableDictionary } from "./types/data";
import './App.scss';

const App = () => {
  const [tableDictionary, setTableDictionary] = useState<TableDictionary>({});
  const [fullDataInstanceInfo, setFullDataInstanceInfo] = useState<FullDataInstanceInfo>({});

  const addDataInstanceTable = async (dataSourceId: string, table: Table, info: any) => {
    // we said the client wont be familiar with the data so chnage it
    setTableDictionary(prev => {
      return {
        ...prev,
        [dataSourceId]: table
      };
    });
    setFullDataInstanceInfo(prev => {
      return {
        ...prev,
        [dataSourceId]: info
      };
    });
  };

  console.log(tableDictionary);

  return (
    <div className="App" id="app">
      <div className="page-title">Yahel and Neta</div>
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
};

export default App;
