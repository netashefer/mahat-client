import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import withLoader from './components/Common/withLoader/withLoader';
import TopBar from './components/TopBar/TopBar';
import './App.scss';

const DashboardPage = lazy(() => import('./components/DashboardPage/DashboardPage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));

const App = () => {
  return (
    <div className="App" id="app">
      <TopBar />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="dashboard/:dashboardId" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      <ToastContainer />
    </div>
  );
};

export default withLoader(App);
