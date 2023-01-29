import { Link } from "@mui/icons-material";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../config/FirebaseConfig";
import { AuthContext } from "../store/AuthContext";

function ChatComponent() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [notLoggedIn, setNotLoggedIn] = useState(null);
  const redirectTo = useNavigate;

  useEffect(() => {
    getUpdatedMessages();
  }, []);

  const getUpdatedMessages = () => {
    const q = query(collection(db, "chatroom"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  };

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
        author: user.email,
        date: new Date(),
      };
      const docRef = await addDoc(collection(db, "chatroom"), msgObj);
      console.log("Document written with ID: ", docRef.id);
      notLoggedIn && redirectTo("/login");
    } catch (error) {
      console.log("post message error :>> ", error);
      const errorMessage = error.message;
      if (errorMessage.includes("addDoc() called with invalid data")) {
        setNotLoggedIn(true);
      } else {
        setNotLoggedIn(false);
      }
    }
  };

  console.log("messages", messages);

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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChatComponent;
