import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/LoginPage'
import LoginCompanyPage from './pages/LoginCompanyPage'
import RegisterPage from './pages/RegisterPage';
import RegisterCompanyPage from './pages/RegisterCompanyPage';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/HomePage';
import JobPortal from './pages/JobPortal';
import { CompanyAuthProvider } from './context/CompanyAuthContext';
import AddJobPage from './pages/AddJobPage'

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
            <PrivateRoute component={JobPortal} path="/job-portal" exact />
            <PrivateRoute component={AddJobPage} path='/job-portal/add' exact />

          </CompanyAuthProvider>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
