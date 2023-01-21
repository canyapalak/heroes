import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroesLogo from "./assets/heroes-noback.png";
import { SearchContext } from "../context/SearchContext";

function NavigationBar() {
  const { searchDispatch } = useContext(SearchContext);

  const handleHomeClick = () => {
    searchDispatch({ type: "reset" });
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={handleHomeClick}>
        <img src={HeroesLogo} alt="Logo" id="heroes-logo" />
      </Link>
    </div>
  )
}

export default NavigationBar