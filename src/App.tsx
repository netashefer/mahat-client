import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss';
import ButtonAppBar from './components/Common/AppBar';
import SignInPage from './views/SignInPage/SignInPage';
import SignUpPage from './views/SignUpPage/SignUpPage';
import theme from './themes/theme';
import DashboardPage from './views/DashboardPage/DashboardPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
          <CssBaseline />
          <ButtonAppBar/>
      <Routes>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
  </Router>
  </ThemeProvider>
  );
};

export default App;
