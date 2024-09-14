import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth(); // Corrected usage of useAuth

  if (loading) {
    return <p>Wait for loading.....</p>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} replace={true} to="/login" />;
};

export default PrivateRoute;
