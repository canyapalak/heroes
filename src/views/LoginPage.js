import React from "react";
import BurgerMenu from "../components/BurgerMenu";
import Footer from "../components/Footer";
import LoginWindow from "../components/LoginWindow";
import NavigationBar from "../components/NavigationBar";

function Login() {
  return (
    <div className="login-page">
      <BurgerMenu />
      <NavigationBar />
      <LoginWindow />
      <Footer />
    </div>
  );
}
export default Login;