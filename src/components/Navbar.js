import React from "react";
import HeroesLogo from "./assets/heroes-noback.png";
import BurgerMenu from "./BurgerMenu";

function Navbar() {
  return (
    <div className="navbar">
      <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      <BurgerMenu />
    </div>
  );
}
export default Navbar;
