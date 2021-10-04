import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated) {
            console.log('logout');
          }
          return isAuthenticated && user.role === 'admin' ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to="/" />
          );
        }}
      ></Route>
    </React.Fragment>
  );
};

export default ProtectedRoute;
