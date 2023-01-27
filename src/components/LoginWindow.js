import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
// import userIsAuth from "../hooks/userIsAuth";

function LoginWindow() {
  // const isUser = userIsAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const redirectTo = useNavigate();
  const { error } = useContext(AuthContext);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!email.includes("@") || !email.includes(".")) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (password.length < 6) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  console.log("user.email :>> ", user.email);

  function handleRegister() {
    register(email, password);
    console.log("error.message :>> ", error.message);
    console.log("error.code :>> ", error.code);
  }

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
        <div className="title-input-error">
          <div className="login-titles">
            <p>E-mail Address:</p>
          </div>
          <input
            type="text"
            placeholder="E-mail Address"
            className="email-input"
            onChange={handleEmailChange}
          />
          {isEmailValid ? (
            <div className="small-red-errors">
              <p>
                <br></br>
              </p>
            </div>
          ) : (
            <div className="small-red-errors">
              <p>Invalid E-mail Address</p>
            </div>
          )}
        </div>
        <div className="title-input-error">
          <div className="login-titles">
            <p>Password:</p>
          </div>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            onChange={handlePasswordChange}
          />
          {isPasswordValid ? (
            <div className="small-red-errors">
              <p>
                <br></br>
              </p>
            </div>
          ) : (
            <div className="small-red-errors">
              <p>Minimum 6 characters</p>
            </div>
          )}
        </div>
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
