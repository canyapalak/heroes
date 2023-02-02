import React from "react";
import NotFound from "../components/assets/404.png";
import NavigationBar from "../components/NavigationBar";

function NoMatch() {
  return (
    <div className="no-match-page">
      <NavigationBar />
      <div>
        <img src={NotFound} alt="Page Not Found" id="page-not-found" />
      </div>
    </div>
  );
}

export default NoMatch;
