import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';


function LoginWindow() {
    
    return (
        <React.Fragment>
            <Card className='login-card'>
                <div className="login-welcome"><p>Log In to Your Account</p></div>
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
                    className="login-button">Log In</Button>
                <hr id="login-line"/>
                <div className="register-text"><p>You don't have an account?</p></div>
                <hr/>
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