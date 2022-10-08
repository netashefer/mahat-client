import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import DashbaordPage from "./components/DashboardPage/DashbaordPage";
import HomePage from "./components/HomePage/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App = () => {

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
