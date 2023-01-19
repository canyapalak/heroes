import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import heroesPanoramic from "./assets/heroes-panoramic.jpg";



function LoginWindow() {
    return (
        <Card className='login-card'>
            <div className="login-welcome"><p>Log In to Your Account</p></div>
            <div className="login-titles"><p>E-mail Address:</p></div>
            <input
        type="text"
        placeholder="e.g. batman@yahoo.com"
        className="input-bar"
        aria-label="Search"
      />
            <div className="login-titles"><p>Password:</p></div>
            <input
        type="text"
        placeholder="Password"
        className="input-bar"
        aria-label="Search"
            />
            <Button
        variant="outline-success"
        className="search-button">Log In</Button>
            



        </Card>
    )
}

export default LoginWindow