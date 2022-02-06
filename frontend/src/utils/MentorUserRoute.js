import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const MentorUserRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    // If user is not authenticated, redirect to login, else continue with the request
    <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>
  );
};

export default MentorUserRoute;
