import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loader } = useContext(AuthContext);

  return (
    <>
      {loader ? (
        <p>....loading...</p>
      ) : user ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default ProtectedRoute;
