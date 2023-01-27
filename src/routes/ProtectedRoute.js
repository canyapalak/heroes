import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function ProtectedRoute({ children }) {
  console.log("children", children);

  const { user } = useContext(AuthContext);

  return <>{user ? children : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
