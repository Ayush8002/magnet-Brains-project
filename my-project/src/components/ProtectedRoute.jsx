import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  redirect = "/login",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;