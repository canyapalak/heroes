import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroesLogo from "./assets/heroes-noback.png";
import { AuthContext } from "../store/AuthContext";

function NavigationBar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="user-name-top-right">
        <p id="welcome">Welcome,&nbsp;</p>
        {user ? (
          <Link to="/profile">
            <p id="user-name">{user.email}</p>
          </Link>
        ) : (
          <p id="user-name">guest</p>
        )}
      </div>

      <Link to="/">
        <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      </Link>
    </div>
  );
}

export default NavigationBar;
