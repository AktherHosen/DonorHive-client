import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { isAdmin, isVolunteer, isLoading } = useAdmin();

  if (isLoading || loading) {
    return <Loader />;
  }

  if (user && (isAdmin || isVolunteer)) {
    return children;
  }

  return <Navigate state={{ from: location }} replace={true} to="/" />;
};

export default AdminRoute;
