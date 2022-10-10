import { Auth0Provider } from '@auth0/auth0-react';
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import './App.scss';
import ButtonAppBar from './components/Common/AppBar/AppBar';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import theme from './themes/theme';
import DashbaordPage from './views/DashboardPage/DashboardPage';
import HomePage from './views/HomePage/HomePage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <div className="App" id="app">
      <RecoilRoot>
	    <Auth0Provider
        domain="graphit.us.auth0.com"
        clientId="3LgivwedUyOayOiLcHOg0HOWwpUZkPgT" //.env file
        redirectUri={window.location.origin}>
        <ThemeProvider theme={theme}>
        <Suspense fallback={<CircularProgress />}>
          <CssBaseline />
          <ButtonAppBar/>
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute component={HomePage} />} />
                <Route path="dashboard/:dashboardId" element={<ProtectedRoute component={DashbaordPage} />} />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
       </Suspense>
    </ThemeProvider>
    <ToastContainer />
    </Auth0Provider>
    </RecoilRoot>
    </div>
  );
};

export default App;
