import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";
// import userIsAuth from "../hooks/userIsAuth";

function LoginWindow() {
  // const isUser = userIsAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <React.Fragment>
      <Card className="login-card">
        <div className="login-welcome">
          <p>Log In to Your Account</p>
        </div>
        <div className="login-titles">
          <p>E-mail Address:</p>
        </div>
        <input
          type="text"
          placeholder="E-mail Address"
          className="email-input"
        />
        <div className="login-titles">
          <p>Password:</p>
        </div>
        <input type="text" placeholder="Password" className="password-input" />
        <Button variant="outline-success" className="login-button">
          Log In
        </Button>
        <hr id="login-line" />
        <div className="register-text">
          <p>You don't have an account?</p>
        </div>
        <br />
        <div className="register-welcome">
          <p>Create Your Account</p>
        </div>
        <div className="login-titles">
          <p>E-mail Address:</p>
        </div>
        <input
          type="text"
          placeholder="E-mail Address"
          className="email-input"
          onChange={handleEmailChange}
        />
        <div className="login-titles">
          <p>Password:</p>
        </div>
        <input
          type="text"
          placeholder="Password"
          className="password-input"
          onChange={handlePasswordChange}
        />
        <Button
          onClick={handleRegister}
          variant="outline-success"
          className="login-button"
        >
          Sign Up
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default LoginWindow;
