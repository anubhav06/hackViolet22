import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CompanyAuthContext from '../context/CompanyAuthContext';
import Header from '../components/Header';

const LoginCompanyPage = () => {
  // Get the login user function from AuthContext
  const { company, loginCompany } = useContext(CompanyAuthContext);

  if (localStorage.getItem('authTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your USER ACCOUNT to login with the COMPANY
        ACCOUNT !{' '}
      </p>
    );
  }

  if (localStorage.getItem('companyAuthTokens') !== null) {
    return (
      <p>
        {' '}
        You need to logout from your COMAPNY ACCOUNT to login with the USER
        ACCOUNT !{' '}
      </p>
    );
  }

  // To not allow login route to a user who is logged in. Redirect to '/'
  if (company) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Header />
      <div>
        <div className="form-header"> Login Form for company </div>
        <form onSubmit={loginCompany}>
          <input type="text" name="email" placeholder="Enter Email" />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
          />{' '}
          <br />
          <input type="submit" className="form-submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default LoginCompanyPage;
