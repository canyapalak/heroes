import { Link } from "react-router-dom";

function BurgerMenu() {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        {/* <!-- */}
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    --> */}
        <input type="checkbox" />

        {/* <!-- */}
        {/* Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
    --> */}
        <span></span>
        <span></span>
        <span></span>

        {/* <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    --> */}
        <ul id="menu">
          <div className="home-icon-and-link">
            <i className="bi bi-house-door-fill" id="home-icon"></i>
            <Link to="/">
              <li>Home</li>
            </Link>
          </div>
          <div className="login-icon-and-link">
            <i className="bi bi-door-open-fill" id="login-icon"></i>
            <a href="http://www.google.com">
              <li>Log In</li>
            </a>
          </div>
          <div className="chatroom-icon-and-link">
            <i className="bi bi-chat-square-text-fill" id="chatroom-icon"></i>
            <a href="http://www.google.com">
              <li>Chat Room</li>
            </a>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default BurgerMenu;
