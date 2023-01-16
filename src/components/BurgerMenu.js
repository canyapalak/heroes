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
            <i class="bi bi-house-door-fill" id="home-icon"></i>
            <a href="http://www.google.com">
              <li>Home</li>
            </a>
          </div>
          <a href="http://www.google.com">
            <li>Log In</li>
          </a>
          <a href="http://www.google.com">
            <li>Register</li>
          </a>
        </ul>
      </div>
    </nav>
  );
}

export default BurgerMenu;
