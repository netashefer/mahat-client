import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import ExcelReader from "./components/ExcelReader/ExcelReader";
import { v4 as uuidv4 } from 'uuid';
import { Table, TableDictionary } from "./types/data";
import './App.scss';
import Catalog from "./components/Catalog/Catalog";
import ManagerPanel from "./components/ManagerPanel/ManagerPanel";

const App = () => {
  const [tableDictionary, setTableDictionary] = useState<TableDictionary>({});

  const addDataInstanceTable = (table: Table) => {
    setTableDictionary(prev => {
      return {
        ...prev,
        [uuidv4()]: table
      }
    })
  }

  console.log(tableDictionary)

  return (
    <div className="App">
      <div className="page-title">Yahel and Neta</div>
      <div className="wrapper">
        <Dashboard />
        {/* <ExcelReader
        addDataInstanceTable={addDataInstanceTable}
      /> */}
        {/* <Catalog /> */}
        <ManagerPanel addDataInstanceTable={addDataInstanceTable}
        />
      </div>
    </div>
  );
}

export default App;
