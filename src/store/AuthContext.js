import { createContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import trash from "../components/assets/trash.png";
import pencil from "../components/assets/pencil.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/FirebaseConfig";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const redirectTo = useNavigate();

  const register = async (email, password) => {
    console.log("email, password :>> ", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("user :>> ", user);
      setUser(userCredential.user);
    } catch (error) {
      console.log("error", error);
      if (error.message.includes("email-already-in-use")) {
        alert("you already have an account");
      }
      if (error.message.includes("invalid-email")) {
        alert("invalid e-mail");
      }
      // const errorMessage = error.message;
    }
  };

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // ----old codes----

  // const redirectTo = useNavigate();
  // const [registerUser, setRegisterUser] = useState({});

  // const login = (e) => {
  //   if (password.length < 4 || password.length > 10) {
  //     alert("Password should contain 4-10 characters.") && e.preventDefault();
  //   }
  //   if (email.length < 4 || email.length > 20) {
  //     alert("E-mail address should contain 4-20 characters.") &&
  //       e.preventDefault();
  //   }

  //   console.log("registerUser :>> ", registerUser);

  //   setRegisterUser({
  //     email: email,
  //     password: password,
  //   });
  //   redirectTo("/");
  // };

  const [commentInput, setCommentInput] = useState(null);
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  const [commentText, setCommentText] = useState();
  const postComment = () => {
    setCommentText(commentInput);

    // return user.email ? (
    //   <div className="be-comment">
    //     <div className="be-comment-content">
    //       <span className="be-comment-name">
    //         <p>{user.email}</p>
    //       </span>
    //       <span className="be-comment-time">
    //         <p>Jan 11, 2023 at 3:34pm</p>
    //       </span>
    //       <p className="be-comment-text">{commentText}</p>
    //       <div className="comment-icons">
    //         <img src={pencil} alt="Edit" id="pencil"></img>
    //         <img src={trash} alt="Delete" id="trash"></img>
    //       </div>
    //     </div>
    //     <hr />
    //   </div>
    // ) : (
    //   redirectTo("/login")
    // );
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        user,
        error,
        postComment,
        handleCommentInput,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
