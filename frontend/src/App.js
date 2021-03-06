/* eslint-disable import/extensions */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrivateRoute from './utils/PrivateRoute';
import CompanyRoute from './utils/CompanyRoute';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage.jsx';
import LoginCompanyPage from './pages/LoginCompanyPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterCompanyPage from './pages/RegisterCompanyPage.jsx';
import UserProfile from './pages/UserProfile.js';
import HomePage from './pages/HomePage';
import JobPortal from './pages/JobPortal';
import JobPortalCompanyView from './pages/JobPortalCompanyView';
import { CompanyAuthProvider } from './context/CompanyAuthContext';
import AddJobPage from './pages/AddJobPage';
import UserRoute from './utils/UserRoute';
import MentorshipPortal from './pages/MentorshipPortal';
import MentorRoute from './utils/MentorRoute';
import MentorUserRoute from './utils/MentorUserRoute';
import MentorViewPortal from './pages/MentorViewPortal';
import Forum from './pages/Forum';
import Navbar from './components/Navbar/Navbar';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#FF5252',
    },
    secondary: {
      main: '#FF5252',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <AuthProvider>
          <CompanyAuthProvider>
            <Navbar />
            <Route component={LoginPage} path="/login" />
            <Route component={LoginCompanyPage} path="/login-company" />
            <Route component={RegisterPage} path="/register" />
            <Route component={RegisterCompanyPage} path="/register-company" />
            <Route component={HomePage} path="/" exact />

            <PrivateRoute component={UserProfile} path="/my-account" exact />

            <MentorUserRoute component={JobPortal} path="/job-portal" exact />
            <UserRoute component={MentorshipPortal} path="/mentorship" exact />
            <MentorRoute
              component={MentorViewPortal}
              path="/mentorship/mentor-view"
              exact
            />

            <MentorUserRoute component={Forum} path="/forum" exact />

            <CompanyRoute
              component={JobPortalCompanyView}
              path="/job-portal/company/"
              exact
            />
            <CompanyRoute
              component={AddJobPage}
              path="/job-portal/company/add"
              exact
            />
          </CompanyAuthProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
