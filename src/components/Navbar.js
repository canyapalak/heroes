import React from "react";
import HeroesLogo from "./assets/heroes-noback.png";
import SearchBar from "./SearchBar";

function Navbar({ heroes }) {
  return (
    <div className="navbar">
      <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
    </div>
  );
}
export default Navbar;
