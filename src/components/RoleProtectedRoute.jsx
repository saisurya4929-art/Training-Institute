import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default RoleProtectedRoute;