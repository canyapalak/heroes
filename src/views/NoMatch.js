import React from "react";
import { Navigate } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <Navigate to={"/"} />
    </div>
  );
}

export default NoMatch;
