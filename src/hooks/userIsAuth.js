import React from "react";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

function userIsAuth() {
  const { user } = useContext(AuthContext);

  const isUserAuthenticated = user.userName ? true : false;

  return isUserAuthenticated;
}

export default userIsAuth;
