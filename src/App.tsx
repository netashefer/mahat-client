import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import './App.scss';
import DashboardPage from './components/DashboardPage/DashboardPage';
import HomePage from './components/HomePage/HomePage';
import TopBar from './components/TopBar/TopBar';

const App = () => {
  return (
    <div className="App" id="app">
      <TopBar />
      <RecoilRoot>
        <Suspense fallback={<CircularProgress />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </RecoilRoot>
      <ToastContainer />
    </div>
  );
};

export default App;
