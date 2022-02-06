import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CompanyAuthContext from '../context/CompanyAuthContext';
import Header from '../components/Header';

const RegisterCompanyPage = () => {
  const { company, registerCompany } = useContext(CompanyAuthContext);

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
    return <Redirect to="/restaurants" />;
  }

  return (
    <div>
      <Header />
      <div>
        <div className="form-header"> Registration Form for companies </div>
        <form onSubmit={registerCompany}>
          <input type="text" name="company" placeholder="Company Name" />
          <input type="text" name="website" placeholder="Company Website" />
          <input type="text" name="email" placeholder="Enter Email" />
          <input type="password" name="password" placeholder="Enter Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Password Again"
          />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
