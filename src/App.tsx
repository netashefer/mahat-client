import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Dashboard from "./components/Dashboard/Dashboard";
import ManagerPanel from "./components/ManagerPanel/ManagerPanel";
import { FullDataInstanceInfo, Table, TableDictionary } from "./types/data";
import excelCommunicator from "./communication/excelCommunicator";
import './App.scss';

const App = () => {

  const addDataInstanceTable = async (table: Table, info: any) => {
    const dataInstanceId = uuidv4();
    const parsedTable = await excelCommunicator.getParsedTable({ table });
    setTableDictionary(prev => {
      return {
        ...prev,
        [dataInstanceId]: parsedTable
      };
    });
    setFullDataInstanceInfo(prev => {
      return {
        ...prev,
        [dataInstanceId]: info
      };
    });
  };

  console.log(tableDictionary);

  return (
    <div className="App" id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashbaordPage />} />
        </Routes>
      </BrowserRouter>,

      <ToastContainer />
    </div>
  );
};

export default App;
