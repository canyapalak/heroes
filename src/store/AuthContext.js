import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";

// create context
export const AuthContext = createContext();

//create the store
export const AuthContextProvider = (props) => {
  console.log("context run>>>");
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
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
  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = () => {
    console.log("currentUser run");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        setLoader(false);
        console.log("currentUser >>>", user);
      } else {
        setUser(null);
        setLoader(false);

        // User is signed out
        // ...
      }
    });
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
        currentUser,
        error,
        loader,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
