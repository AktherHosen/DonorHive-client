import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { isAdmin, isVolunteer, isLoading } = useAdmin();

  // Show loading state while data is being fetched
  if (isLoading || loading) {
    return <p>Wait for loading.....</p>;
  }

  // Allow access if the user is either an admin or a volunteer
  if (user && (isAdmin || isVolunteer)) {
    return children;
  }

  // Redirect to home page if not authorized
  return <Navigate state={{ from: location }} replace={true} to="/" />;
};

export default AdminRoute;
