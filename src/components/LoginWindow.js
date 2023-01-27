import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginWindow() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isRegisterEmailValid, setIsRegisterEmailValid] = useState(true);
  const [isRegisterPasswordValid, setIsRegisterPasswordValid] = useState(true);
  const [isLoginEmailValid, setIsLoginEmailValid] = useState(true);
  const [isLoginPasswordValid, setIsLoginPasswordValid] = useState(true);
  const { register, user, error, isEmailInUse, setIsEmailInUse } =
    useContext(AuthContext);
  const redirectTo = useNavigate();

  useEffect(() => {
    checkRegisterPassword();
    console.log("user :>> ", user);
    if (user) {
      redirectTo("/");
      console.log("user :>> ", user);
    }
  }, [registerPassword, user]);

  useEffect(() => {
    checkRegisterEmail();
  }, [registerEmail]);

  useEffect(() => {
    setIsEmailInUse(false);
    setIsRegisterPasswordValid(true);
    setIsRegisterEmailValid(true);
    setIsLoginEmailValid(true);
    setIsLoginPasswordValid(true);
  }, []);

  const checkRegisterPassword = () => {
    if (registerPassword.length < 6) {
      setIsRegisterPasswordValid(false);
    } else {
      setIsRegisterPasswordValid(true);
    }
  };

  const checkRegisterEmail = () => {
    if (!registerEmail.includes("@") || !registerEmail.includes(".")) {
      setIsRegisterEmailValid(false);
    } else {
      setIsRegisterEmailValid(true);
    }
  };

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
    console.log("registerPassword", registerPassword);
  };

  function handleRegister() {
    register(registerEmail, registerPassword);
    setIsEmailInUse(false);
  }

  return (
    <React.Fragment>
      <Card className="login-card">
        <div className="login-welcome">
          <p>Log In to Your Account</p>
        </div>
        <div className="title-input-error">
          <div className="login-titles">
            <p>E-mail Address:</p>
          </div>
          <input
            type="text"
            placeholder="E-mail Address"
            className="email-input"
            // onChange={handleEmailChange}
            autoComplete="email"
          />
          <div className="small-red-errors">
            {/* {!isLoginEmailValid && <p>Invalid e-mail address</p>} */}
          </div>
        </div>
        <div className="title-input-error">
          <div className="login-titles">
            <p>Password:</p>
          </div>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            // onChange={handlePasswordChange}
          />
          {/* {setIsLoginPasswordValid ? (
            <div className="small-red-errors">
              <p>
                <br></br>
              </p>
            </div>
          ) : (
            <div className="small-red-errors">
              <p>Minimum 6 characters</p>
            </div>
          )} */}
        </div>
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
            onChange={handleRegisterEmailChange}
            autoComplete="email"
          />
          <div className="small-red-errors">
            {!isRegisterEmailValid && <p>Invalid e-mail address</p>}
            {isEmailInUse && <p>This address is already in use</p>}
          </div>
        </div>
        <div className="title-input-error">
          <div className="login-titles">
            <p>Password:</p>
          </div>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            onChange={handleRegisterPasswordChange}
          />
          {isRegisterPasswordValid ? (
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
