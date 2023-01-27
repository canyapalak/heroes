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
        <p id="user-name">{user.email ? user.email : "guest"}</p>
      </div>
      <Link to="/">
        <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      </Link>
    </div>
  );
}

export default NavigationBar;
