import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function BurgerMenu() {
  const { user } = useContext(AuthContext);

  function logOut() {
    userEvent.userName = [""];
  }

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <div className="home-icon-and-link">
            <i className="bi bi-house-door-fill" id="home-icon"></i>
            <Link to="/">
              <li>Home</li>
            </Link>
          </div>
          <div className="login-icon-and-link">
            <i className="bi bi-door-open-fill" id="login-icon"></i>
            {user.userName ? (
              <Link to="/" onClick={logOut}>
                <li>Log Out</li>
              </Link>
            ) : (
              <Link to="/login">
                <li>Log In</li>
              </Link>
            )}
          </div>
          <div className="chatroom-icon-and-link">
            <i className="bi bi-chat-square-text-fill" id="chatroom-icon"></i>
            <Link to="/chatroom">
              <li>Chat Room</li>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default BurgerMenu;
