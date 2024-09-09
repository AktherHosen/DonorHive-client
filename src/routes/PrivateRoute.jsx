import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth;
  if (loading) {
    return <p>Wait for loading.....</p>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={{ from: location }} replace={true} to="/login"></Navigate>
  );
};

export default PrivateRoute;
