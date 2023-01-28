import { createContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import trash from "../components/assets/trash.png";
import pencil from "../components/assets/pencil.png";
import { auth } from "../config/FirebaseConfig";
import { registerVersion } from "firebase/app";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState({});
  const [isEmailInUse, setIsEmailInUse] = useState(false);
  const [isEmailNotFound, setIsEmailNotFound] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  //firebase sign up
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
      const errorMessage = error.message;
      if (errorMessage.includes("email-already-in-use")) {
        setIsEmailInUse(true);
      } else {
        setIsEmailInUse(false);
      }
    }
  };

  //firebase login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user :>> ", user);
      setUser(userCredential.user);
    } catch (error) {
      console.log("error", error);
      const errorMessage = error.message;
      if (errorMessage.includes("wrong-password")) {
        setIsPasswordWrong(true);
      } else {
        setIsPasswordWrong(false);
      }
      if (errorMessage.includes("user-not-found")) {
        setIsEmailNotFound(true);
      } else {
        setIsEmailNotFound(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        isEmailInUse,
        setIsEmailInUse,
        isEmailNotFound,
        setIsEmailNotFound,
        isPasswordWrong,
        setIsPasswordWrong,
        user,
        setUser,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
