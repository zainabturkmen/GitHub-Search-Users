import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children,...rest}) => {
  const isUser = true;
  return <h2>private route component</h2>;
};
export default PrivateRoute;
