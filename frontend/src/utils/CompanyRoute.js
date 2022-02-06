/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import CompanyAuthContext from '../context/CompanyAuthContext';

const CompanyRoute = ({ children, ...rest }) => {
  const { company } = useContext(CompanyAuthContext);

  return (
    // If company is not authenticated, redirect to login, else continue with the request
    <Route {...rest}>{!company ? <Redirect to="/login" /> : children}</Route>
  );
};

export default CompanyRoute;
