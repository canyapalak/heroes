import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userIsAuth from "../hooks/userIsAuth";
import trash from "../components/assets/trash.png";
import pencil from "../components/assets/pencil.png";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  const redirectTo = useNavigate();
  const [user, setUser] = useState({});
  const [password, setPassword] = useState({});

  const login = (e) => {
    console.log("user, password", userNameInputValue, passwordInputValue);
    if (passwordInputValue.length < 4 || passwordInputValue.length > 10) {
      alert("Password is not valid") && e.preventDefault();
    }
    if (userNameInputValue.length < 4 || userNameInputValue.length > 10) {
      alert("User name is not valid") && e.preventDefault();
    }

    setUser({
      userName: userNameInputValue,
    });
    setPassword({
      passwordText: passwordInputValue,
    });
    redirectTo("/");
  };

  const [passwordInputValue, setPasswordInputValue] = useState(null);
  const handlePasswordChange = (e) => {
    setPasswordInputValue(e.target.value);
    // console.log('inputValue :>> ', inputValue);
  };

  const [userNameInputValue, setUserNameInputValue] = useState(null);
  const handleUserNameChange = (e) => {
    setUserNameInputValue(e.target.value);
    // console.log('inputValue :>> ', inputValue);
  };

  const [commentInput, setCommentInput] = useState(null);
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const [commentText, setCommentText] = useState();
  const postComment = () => {
    setCommentText(commentInput);

    return user.userName ? (
      <div className="be-comment">
        <div className="be-comment-content">
          <span className="be-comment-name">
            <p>{user.userName}</p>
          </span>
          <span className="be-comment-time">
            <p>Jan 11, 2023 at 3:34pm</p>
          </span>
          <p className="be-comment-text">{commentText}</p>
          <div className="comment-icons">
            <img src={pencil} alt="Edit" id="pencil"></img>
            <img src={trash} alt="Delete" id="trash"></img>
          </div>
        </div>
        <hr />
      </div>
    ) : (
      redirectTo("/login")
    );
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        handleUserNameChange,
        password,
        handlePasswordChange,
        commentText,
        postComment,
        handleCommentInput,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
