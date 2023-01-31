import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function BurgerMenu() {
  const redirectTo = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (user) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [user]);

  function logOut() {
    setUser("");
    redirectTo("/");
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
            {active ? (
              <Link to="/" onClick={logOut}>
                <li>Log Out</li>
              </Link>
            ) : (
              <Link to="/login">
                <li>Log In</li>
              </Link>
            )}
          </div>
          {user && (
            <div className="profile-icon-and-link">
              <i className="bi bi-person-fill" id="profile-icon"></i>
              <Link to="/profile">
                {" "}
                <li>Profile</li>{" "}
              </Link>
            </div>
          )}
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
