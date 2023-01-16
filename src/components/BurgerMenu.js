import React from "react";

function BurgerMenu() {
  return (
    <React.Fragment>
      <input type="checkbox" className="toggler" />
      <div className="hamburger">
        <div></div>
      </div>
      <div className="menu">
        <div>
          <ul>
            <li>
              <a href="#">Log In</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BurgerMenu;
