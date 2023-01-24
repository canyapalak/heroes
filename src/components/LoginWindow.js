import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";


function LoginWindow() {

    const { login } = useContext(AuthContext);
    const { handleUserNameChange } = useContext(AuthContext);
    // const [loginInputValue, setLoginInputValue] = useState();
    // const { fetchLoginInput, setFetchLoginInput} = useState(AuthContext)

    // const handleChange = (e) => {
    // setLoginInputValue(e.target.value)
    // console.log('loginInputValue :>> ', loginInputValue);
    // }

    // const handleClick = () => {
    // setFetchLoginInput(setLoginInputValue)
    // }
    
    return (
        <React.Fragment>
            <Card className='login-card'>
                <div className="login-welcome"><p>Log In to Your Account</p></div>
                <div className="login-titles"><p>Username:</p></div>
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input-bar"
                    aria-label="Search"
                    onChange={handleUserNameChange} />
                <div className="login-titles"><p>Password:</p></div>
                <input
                    type="text"
                    placeholder="Password"
                    className="login-input-bar"
                    aria-label="Search" />
                <Button
                    variant="outline-success"
                    className="login-button"
                    onClick={login}
                >Log In</Button>
                <hr id="login-line"/>
                <div className="register-text"><p>You don't have an account?</p></div>
                <br/>
                <div className="register-welcome"><p>Create Your Account</p></div>
                <div className="login-titles"><p>Username:</p></div>
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input-bar"
                    aria-label="Search" />
                <div className="login-titles"><p>Password:</p></div>
                <input
                    type="text"
                    placeholder="Password"
                    className="login-input-bar"
                    aria-label="Search" />
                <Button
                    variant="outline-success"
                    className="login-button">Sign Up</Button>
                </Card>
        </React.Fragment>
    )
}



export default LoginWindow