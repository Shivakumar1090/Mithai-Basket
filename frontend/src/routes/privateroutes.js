import React from "react";
import { Navigate, Route } from "react-router-dom";

const privateRoute = ({ component: Component, isAuthenticated, ...children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <Route {...children} render={props => <Component {...props} {...children} />} />
};

export default privateRoute;