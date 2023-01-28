import { collection, getDocs, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../config/FirebaseConfig";
import { AuthContext } from "../store/AuthContext";

function ChatComponent() {
  console.log("db :>> ", db);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  const getMessages = async () => {
    const q = query(collection(db, "chatroom"));

    const querySnapshot = await getDocs(q);
    const msgs = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      msgs.push(doc.data());
    });
    setMessages(msgs);
  };

  const msgDate = (dateAndTime) => {
    const date = new Date(dateAndTime * 1000).toLocaleDateString();
    const time = new Date(dateAndTime * 1000).toLocaleTimeString();
    return (
      <p>
        {date} {time}
      </p>
    );
  };

  useEffect(() => {
    getMessages();
  }, []);

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
                    <p>{msgDate(message.date.seconds)}</p>
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
                    // onChange={handleCommentInput}
                  ></textarea>
                </div>
              </div>
              <Button
                variant="outline-success"
                className="chatroom-button"
                // onClick={postComment}
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
