/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';

const RegisterPage = () => {
  const { user, registerUser } = useContext(AuthContext);

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
  if (user) {
    return <Redirect to="/restaurants" />;
  }

  return (
    <div>
      <Header />
      <div>
        <div className="form-header"> Registration Form </div>
        <form onSubmit={registerUser}>
          <input type="text" name="email" placeholder="Enter Email" />
          <input type="password" name="password" placeholder="Enter Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Password Again"
          />
          <label>
            I am a mentor
            <input type="checkbox" name="mentor" />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
