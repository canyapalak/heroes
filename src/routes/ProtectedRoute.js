import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import userIsAuth from "../hooks/userIsAuth";
import { AuthContext } from "../store/AuthContext";

function ProtectedRoute({ children }) {
  console.log("children", children);

  const { user } = useContext(AuthContext);

  const isUser = userIsAuth();

  return <>{isUser ? children : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
