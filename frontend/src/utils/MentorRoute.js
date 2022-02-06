import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const MentorRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  let mentor = false;

  if (user && user.group === 'Mentor') {
    mentor = true;
  }

  return (
    // If user is not authenticated, redirect to login, else continue with the request
    <Route {...rest}>{!mentor ? <Redirect to="/login" /> : children}</Route>
  );
};

export default MentorRoute;
