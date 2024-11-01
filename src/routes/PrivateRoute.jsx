import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }  
  return <Navigate state={{ from: location }} replace={true} to="/login" />;
};

export default PrivateRoute;
