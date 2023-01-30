import {
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../config/FirebaseConfig";
import { AuthContext } from "../store/AuthContext";
import trash from "../components/assets/trash.png";

function ChatComponent() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(() => {
    getMessages();
    setisLoggedIn(true);
  }, []);

  const getMessages = async () => {
    const q = query(collection(db, "chatroom"), orderBy("date", "asc"));
    onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        const msgObj = {
          id: doc.id,
          ...doc.data(),
        };
        msgs.push(msgObj);
      });
      setMessages(msgs);
    });
  };

  // const getUpdatedMessages = () => {
  //   const q = query(collection(db, "chatroom"), orderBy("date", "asc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const msgs = [];
  //     querySnapshot.forEach((doc) => {
  //       msgs.push(doc.data());
  //       console.log("doc.data", doc.data);
  //       console.log("doc.id", doc.id);
  //     });
  //     setMessages(msgs);
  //   });
  // };

  const msgDate = (dateAndTime) => {
    const date = new Date(dateAndTime * 1000).toLocaleDateString();
    const time = new Date(dateAndTime * 1000).toLocaleTimeString();
    return (
      <>
        {date} {time}
      </>
    );
  };

  //add new comment

  const handleMessageInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmitMessage = async () => {
    try {
      const msgObj = {
        text: text,
        author: user.displayName ? user.displayName : user.email,
        date: new Date(),
      };
      const docRef = await addDoc(collection(db, "chatroom"), msgObj);
      console.log("Document written with ID: ", docRef.id);
      console.log("docRef", docRef);
    } catch (error) {
      console.log("post message error :>> ", error);
      const errorMessage = error.message;
      if (errorMessage.includes("called with invalid data")) {
        setisLoggedIn(false);
      } else {
        setisLoggedIn(true);
      }
    }
  };

  //delete comment

  const handleDeleteMessage = async (e) => {
    try {
      console.log("msgs", e.target.id);
      await deleteDoc(doc(db, "chatroom", e.target.id));
      console.log("successfull :>> ");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="chatroom-container">
      <div className="be-comment-block">
        <h1 className="comments-title">Chat Room</h1>
        {messages &&
          messages.map((message, index) => {
            return (
              <div className="be-comment" key={index}>
                <div className="be-comment-content">
                  <span className="be-comment-name">
                    <p>{message.author}</p>
                  </span>
                  <span className="be-comment-time">
                    <p>{msgDate(message.date)}</p>
                  </span>
                  <p className="be-comment-text">{message.text}</p>
                  {message.author === user.email ||
                    (message.author === user.displayName && (
                      <img
                        src={trash}
                        alt="Delete"
                        id={message.id}
                        onClick={handleDeleteMessage}
                        className="trash"
                      />
                    ))}
                </div>
                <hr />
              </div>
            );
          })}
        <div>
          <form className="form-block">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <textarea
                    className="form-input"
                    required=""
                    placeholder="Write a comment..."
                    onChange={handleMessageInput}
                  ></textarea>
                </div>
              </div>
              <Button
                variant="outline-success"
                className="chatroom-button"
                onClick={handleSubmitMessage}
              >
                Submit
              </Button>
              {isLoggedIn ? (
                <div className="you-are-not-logged-in">
                  <p>
                    <br></br>
                  </p>
                </div>
              ) : (
                <div className="you-are-not-logged-in">
                  <p>You are not logged in</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChatComponent;
