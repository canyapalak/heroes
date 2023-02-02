import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroesLogo from "./assets/heroes-noback.png";
import { AuthContext } from "../store/AuthContext";

function NavigationBar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, [user]);

  return (
    <div className="navbar">
      <div className="user-name-top-right">
        <p id="welcome">Welcome,&nbsp;</p>
        {!user ? (
          <p id="user-name">guest</p>
        ) : (
          <Link to="/profile">
            <p id="user-name">{user.displayName || user.email}</p>
          </Link>
        )}
      </div>
      <Link to="/">
        <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      </Link>
    </div>
  );
}

export default NavigationBar;
