/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Get the value of authToken from local storage. If the local storage contains authTokens, then parse the token(get the value back) , else set that to null
  // Callback function sets the value only once on inital load
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  // If the local storage contains authTokens, then decode the token, else set that to null
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  // Login User method
  const loginUser = async (e) => {
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
          username: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    if (response.status === 200) {
      // If a restaurant owner tries to login, the return without allocating the authTokens
      if (jwt_decode(data.access).group === 'Comapny') {
        alert('You need to login with a user account');
        return;
      }

      // Update the state with the logged in tokens
      setAuthTokens(data);
      // Decode the access token and store the information
      setUser(jwt_decode(data.access));
      // Set the authTokens in the local storage
      localStorage.setItem('authTokens', JSON.stringify(data));
      // Redirect user to home page
      history.push('/');
    } else {
      alert('Something went wrong!');
    }
  };

  // Logout User method
  const logoutUser = () => {
    // To logout, set 'setAuthTokens' and 'setUser' to null and remove the 'authTokens' from local storage
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    history.push('/');
  };

  // To register a user
  const registerUser = async (e) => {
    e.preventDefault();

    // Make a post request to the api with the user's credentials.
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/register-user/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          confirmPassword: e.target.confirmPassword.value,
          mentor: e.target.mentor.checked,
        }),
      }
    );
    // Get the access and refresh tokens
    const data = await response.json();

    // If registration is successfull, then go ahead and login.
    if (response.status === 200) {
      loginUser(e);
    } else {
      alert('ERROR: ', data);
    }
  };

  // Context data for AuthContext so that it can be used in other pages
  const contextData = {
    user: user,
    authTokens: authTokens,

    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  // To update the access tokens after every few time interval
  useEffect(() => {
    // --------------------------- updateToken method  ----------------------------------------
    // To update the access token
    const updateToken = async () => {
      // If no authToken exists i.e. user is not logged in then return
      if (!authTokens) {
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
          body: JSON.stringify({ refresh: authTokens?.refresh }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        // Update the data as done similarly in the login user method
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        logoutUser();
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
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    // Clear the interval after firing preventing re-initializing every time, refer to docs for more details
    return () => clearInterval(interval);
  }, [authTokens, loading, logoutUser]);

  return (
    <AuthContext.Provider value={contextData}>
      {/* Render children components only after AuthContext loading is complete */}
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
