import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import CompanyRoute from './utils/CompanyRoute'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/LoginPage'
import LoginCompanyPage from './pages/LoginCompanyPage'
import RegisterPage from './pages/RegisterPage';
import RegisterCompanyPage from './pages/RegisterCompanyPage';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/HomePage';
import JobPortal from './pages/JobPortal';
import JobPortalCompanyView from './pages/JobPortalCompanyView';
import { CompanyAuthProvider } from './context/CompanyAuthContext';
import AddJobPage from './pages/AddJobPage'
import UserRoute from './utils/UserRoute'
import MentorshipPortal from './pages/MentorshipPortal'
import MentorRoute from './utils/MentorRoute'
import MentorViewPortal from './pages/MentorViewPortal'
import Forum from './pages/Forum'

function App() {
  return (
    <div className="App">
      <Router>
        
        <AuthProvider>
          <CompanyAuthProvider>

            <Route component={LoginPage} path="/login"/>
            <Route component={LoginCompanyPage} path="/login-company" />
            <Route component={RegisterPage} path="/register"/>
            <Route component={RegisterCompanyPage} path="/register-company"/>
            <Route component={HomePage} path="/" exact />

            <PrivateRoute component={UserProfile} path="/my-account"  exact />
            
            <UserRoute component={JobPortal} path="/job-portal" exact />
            <UserRoute component={MentorshipPortal} path='/mentorship' exact />
            <MentorRoute component={MentorViewPortal} path='/mentorship/mentor-view' exact/>

            <UserRoute component={Forum} path='/forum' exact />
            
            <CompanyRoute component={JobPortalCompanyView} path="/job-portal/company/" exact />
            <CompanyRoute component={AddJobPage} path='/job-portal/company/add' exact />

          </CompanyAuthProvider>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
