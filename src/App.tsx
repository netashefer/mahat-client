import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonAppBar from './components/Common/AppBar/AppBar';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import theme from './themes/theme';
import DashboardPage from './views/DashboardPage/DashboardPage';
import HomePage from './views/HomePage/HomePage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import './App.scss';

const App = () => {
  return (
	<Auth0Provider
    domain="graphit.us.auth0.com"
    clientId="3LgivwedUyOayOiLcHOg0HOWwpUZkPgT" //.env file
    redirectUri={window.location.origin}>
    <ThemeProvider theme={theme}>
          <CssBaseline />
          <ButtonAppBar/>
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={HomePage} />} />
        <Route path="/dashboard" element={<ProtectedRoute component={DashboardPage} />}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
  </Router>
  </ThemeProvider>
    <ToastContainer />
  </Auth0Provider>
  );
};

export default App;
