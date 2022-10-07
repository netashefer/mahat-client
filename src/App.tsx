import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import DashbaordPage from "./components/DashboardPage/DashbaordPage";
import HomePage from "./components/HomePage/HomePage";

const App = () => {

  return (
    <div className="App" id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<DashbaordPage />} />
        </Routes>
      </BrowserRouter>,

    </div>
  );
};

export default App;
