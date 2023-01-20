import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';


function LoginWindow() {

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => {
    setShowRegister(false);
     }
    
    const handleShowRegister = () => {
        setShowRegister(true);
    }
    
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
            <div className="register-text"><p>You don't have an account?</p></div>
                <div className="register-text-link">
                    <a href="#" onClick={() => handleShowRegister()}>Register here.</a>
                </div>
            </Card>
            
            <Modal show={showRegister} onHide={handleShowRegister}>
                <Modal.Dialog>
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
                <div className="register-text-link">
<Button variant="light" id="closeButton" onClick={() => handleCloseRegister()}>CLOSE</Button>
                </div>
            </Modal.Dialog>

            </Modal>
        </React.Fragment>
    )
}



export default LoginWindow