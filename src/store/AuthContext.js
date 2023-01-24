import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

// create context
export const AuthContext = createContext();


//create the store
export const AuthContextProvider = (props) => {

    // function registerUserName() {
    //     return (
    //             <input
    //             type="text"
    //             placeholder="Username"
    //             className="login-input-bar"
    //             aria-label="Search" />
    //         onInput
    //     )

    // }
    // registerUserName()

    const redirectTo = useNavigate();

    const [user, setUser] = useState({})
    
    const login = () => {
        setUser({
            userName: userNameInputValue,
        })
        redirectTo("/")
    }

    const [userNameInputValue, setUserNameInputValue] = useState(null)
    const handleUserNameChange = (e) => {
        setUserNameInputValue(e.target.value)
    // console.log('inputValue :>> ', inputValue);
  }

    return <AuthContext.Provider value={{ user, login, handleUserNameChange }}>{props.children}</AuthContext.Provider>;
}

