import React from "react";
import { Link } from "react-router-dom";
import HeroesLogo from "./assets/heroes-noback.png";

function NavigationBar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      </Link>
    </div>
  );
}
export default NavigationBar;
