/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const CompanyAuthContext = createContext();

export default CompanyAuthContext;

export const CompanyAuthProvider = ({ children }) => {
  // Get the value of authToken from local storage. If the local storage contains authTokens, then parse the token(get the value back) , else set that to null
  // Callback function sets the value only once on inital load
  const [companyAuthTokens, setCompanyAuthTokens] = useState(() =>
    localStorage.getItem('companyAuthTokens')
      ? JSON.parse(localStorage.getItem('companyAuthTokens'))
      : null
  );
  // If the local storage contains authTokens, then decode the token, else set that to null
  const [company, setCompany] = useState(() =>
    localStorage.getItem('companyAuthTokens')
      ? jwt_decode(localStorage.getItem('companyAuthTokens'))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  // Login Company method
  const loginCompany = async (e) => {
    e.preventDefault();

    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/token/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({
          'username': e.target.email.value,
          'password': e.target.password.value,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      // If a normal user tries to login, the return without allocating the authTokens
      if (
        jwt_decode(data.access).group === 'Mentor' ||
        jwt_decode(data.access).group === 'None'
      ) {
        alert('You need to login with a company account');
        return;
      }

      // Update the state with the logged in tokens
      setCompanyAuthTokens(data);
      // Decode the access token and store the information
      setCompany(jwt_decode(data.access));
      // Set the authTokens in the local storage
      localStorage.setItem('companyAuthTokens', JSON.stringify(data));
      // Redirect user to home page
      history.push('/');
    } else {
      alert('Something went wrong!');
    }
  };

  // Logout Company method
  const logoutCompany = () => {
    // To logout, set 'setCompanyAuthTokens' and 'setCompany' to null and remove the 'authTokens' from local storage
    setCompanyAuthTokens(null);
    setCompany(null);
    localStorage.removeItem('companyAuthTokens');
    history.push('/');
  };

  // To register a user
  const registerCompany = async (e) => {
    e.preventDefault();

    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/register-company/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({
          'company': e.target.company.value,
          'website': e.target.website.value,
          'email': e.target.email.value,
          'password': e.target.password.value,
          'confirmPassword': e.target.confirmPassword.value,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    // If registration is successfull, then go ahead and login.
    if (response.status === 200) {
      loginCompany(e);
    } else {
      alert('ERROR: ', data);
    }
  };

  // Context data for AuthContext so that it can be used in other pages
  const contextData = {
    company: company,
    companyAuthTokens: companyAuthTokens,

    loginCompany: loginCompany,
    logoutCompany: logoutCompany,
    registerCompany: registerCompany,
  };

  // To update the access tokens after every few time interval
  useEffect(() => {
    // --------------------------- updateToken method  ----------------------------------------
    // To update the access token
    const updateToken = async () => {
      // If no authToken exists i.e. user is not logged in then return
      if (!companyAuthTokens) {
        setLoading(false);
        return;
      }
      // Make a post request to the api with the refresh token to update the access token
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/token/refresh/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send the refresh token
          body: JSON.stringify({ refresh: companyAuthTokens?.refresh }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        // Update the data as done similarly in the login user method
        setCompanyAuthTokens(data);
        setCompany(jwt_decode(data.access));
        localStorage.setItem('companyAuthTokens', JSON.stringify(data));
      } else {
        logoutCompany();
      }

      if (loading) {
        setLoading(false);
      }
    };
    // --------------------------- updateToken method end  ----------------------------------------

    if (loading) {
      updateToken();
    }

    const fourMinutes = 1000 * 60 * 4;

    const interval = setInterval(() => {
      if (companyAuthTokens) {
        updateToken();
      }
    }, fourMinutes);
    // Clear the interval after firing preventing re-initializing every time, refer to docs for more details
    return () => clearInterval(interval);
  }, [companyAuthTokens, loading]);

  return (
    <CompanyAuthContext.Provider value={contextData}>
      {/* Render children components only after AuthContext loading is complete */}
      {loading ? null : children}
    </CompanyAuthContext.Provider>
  );
};
