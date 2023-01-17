import React from "react";
import HeroesLogo from "./assets/heroes-noback.png";

function NavigationBar() {
  return (
    <div className="navbar">
      <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
    </div>
  );
}
export default NavigationBar;
