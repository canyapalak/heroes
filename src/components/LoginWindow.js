import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function LoginWindow() {
    return (
        <Card className='login-card'>
            <div className="login-welcome"><p>Log In to Your Account</p></div>
            <div className="login-titles"><p>E-mail Address:</p></div>
            <input
        type="text"
        placeholder="e.g. batman@yahoo.com"
        className="login-input-bar"
        aria-label="Search"
      />
            <div className="login-titles"><p>Password:</p></div>
            <input
        type="text"
        placeholder="Password"
        className="login-input-bar"
        aria-label="Search"
            />
            <Button
        variant="outline-success"
                className="login-button">Log In</Button>
            <div className="register-text"><p>You don't have an account?</p></div>
            <div className="register-text-link"><p>Register here.</p></div>

            



        </Card>
    )
}

export default LoginWindow