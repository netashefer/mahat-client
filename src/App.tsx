import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { Data } from "./types/data";
import ExcelReader from "./components/ExcelReader/ExcelReader";
import './App.scss';

const App = () => {
  const [data, setData] = useState<Data>([]);
  const [schema, setSchema] = useState<string[]>([]);

  return (
    <div className="App">
      <ExcelReader
        setData={setData}
        setSchema={setSchema}
      />
      <Dashboard />
    </div>
  );
}

export default App;
