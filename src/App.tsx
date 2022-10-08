import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss';
import ButtonAppBar from './components/Common/AppBar';
import SignIn from './components/UserSignIn/SignIn';
import SignUp from './components/UserSignUp/UserSignUp';
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
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
  </Router>
  </ThemeProvider>
  );
};

export default App;
