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
  const {
    register,
    login,
    user,
    error,
    isEmailInUse,
    setIsEmailInUse,
    isPasswordWrong,
    setIsPasswordWrong,
    isEmailNotFound,
    setIsEmailNotFound,
  } = useContext(AuthContext);
  const redirectTo = useNavigate();

  //register hooks
  useEffect(() => {
    checkRegisterPassword();
    if (user) {
      redirectTo("/");
    }
  }, [registerPassword, user]);

  useEffect(() => {
    checkRegisterEmail();
  }, [registerEmail]);

  //login hooks
  useEffect(() => {
    checkLoginPassword();
    if (user) {
      redirectTo("/");
    }
  }, [loginPassword, user]);

  useEffect(() => {
    checkLoginEmail();
  }, [loginEmail]);

  useEffect(() => {
    checkLoginPassword();
  }, [loginPassword]);

  //page refresh
  useEffect(() => {
    setIsEmailInUse(false);
    setIsRegisterPasswordValid(true);
    setIsRegisterEmailValid(true);
    setIsLoginEmailValid(true);
    setIsLoginPasswordValid(true);
    setIsEmailNotFound(false);
    setIsPasswordWrong(false);
  }, []);

  //register

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

  //login

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  function handleLogin() {
    login(loginEmail, loginPassword);
  }

  const checkLoginPassword = () => {
    if (loginPassword.length < 6) {
      setIsLoginPasswordValid(false);
    } else {
      setIsLoginPasswordValid(true);
    }
  };

  const checkLoginEmail = () => {
    if (!loginEmail.includes("@") || !loginEmail.includes(".")) {
      setIsLoginEmailValid(false);
    } else {
      setIsLoginEmailValid(true);
    }
  };

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
            onChange={handleLoginEmailChange}
            autoComplete="email"
          />
          {!isLoginEmailValid && !isEmailNotFound ? (
            <div className="small-red-errors">
              <p>Invalid e-mail address</p>
            </div>
          ) : isLoginEmailValid && !isEmailNotFound ? (
            <div className="small-red-errors">
              <p></p>
            </div>
          ) : !isLoginEmailValid && isEmailNotFound ? (
            <div className="small-red-errors-two-errors">
              <p id="invalid-email">Invalid e-mail address</p>
              <p id="email-not-found">E-mail address is not found</p>
            </div>
          ) : (
            <div className="small-red-errors">
              <p>E-mail address is not found</p>
            </div>
          )}
        </div>
        <div className="title-input-error-login-password">
          <div className="login-titles">
            <p>Password:</p>
          </div>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            onChange={handleLoginPasswordChange}
          />
          {!isLoginPasswordValid && !isPasswordWrong ? (
            <div className="small-red-errors">
              <p>Minimum 6 characters</p>
            </div>
          ) : isLoginPasswordValid && !isPasswordWrong ? (
            <div className="small-red-errors">
              <p></p>
            </div>
          ) : !isLoginPasswordValid && isPasswordWrong ? (
            <div className="small-red-errors-two-errors">
              <p id="invalid-password">Minimum 6 characters</p>
              <p id="password-is-wrong">Password is wrong</p>
            </div>
          ) : (
            <div className="small-red-errors-two-errors">
              <p>Password is wrong</p>
            </div>
          )}
        </div>
        <Button
          onClick={handleLogin}
          variant="outline-success"
          className="login-button"
        >
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
          {!isEmailInUse && isRegisterEmailValid ? (
            <div className="small-red-errors">
              <p></p>
            </div>
          ) : !isEmailInUse && !isRegisterEmailValid ? (
            <div className="small-red-errors">
              <p>Invalid e-mail address</p>
            </div>
          ) : isEmailInUse && isRegisterEmailValid ? (
            <div className="small-red-errors">
              <p>This address is already in use</p>
            </div>
          ) : (
            <div className="small-red-errors-two-errors">
              <p id="invalid-email">Invalid e-mail address</p>
              <p id="email-in-use">This address is already in use</p>
            </div>
          )}
        </div>
        <div className="title-input-error-register-password">
          <div className="login-titles-password">
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
          className="register-button"
        >
          Sign Up
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default LoginWindow;
