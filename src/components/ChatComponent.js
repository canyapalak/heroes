import {
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { db } from "../config/FirebaseConfig";
import { AuthContext } from "../store/AuthContext";
import trash from "../components/assets/trash.png";
import pencil from "../components/assets/pencil.png";
import avatarPlaceholder from "./assets/avatar-placeholder.png";

function ChatComponent() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  useEffect(() => {
    getMessages();
    setisLoggedIn(true);
  }, []);

  //read messages

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
        console.log("msgs :>> ", msgs);
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

  //add new message

  const handleMessageInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmitMessage = async () => {
    try {
      if (user.photoURL === null) {
        user.photoURL = avatarPlaceholder;
      }

      const msgObj = {
        text: text,
        author: user.displayName ? user.displayName : user.email,
        date: new Date(),
        profileImg: user.photoURL,
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

  //delete message

  const handleDeleteMessage = async (e) => {
    try {
      console.log("msgs", e.target.id);
      await deleteDoc(doc(db, "chatroom", e.target.id));
      console.log("successfull :>> ");
    } catch (error) {
      console.log("error", error);
    }
    handleCloseModal();
  };

  //edit message

  const handleUpdatedMessageInput = (e) => {
    setUpdatedText(e.target.value);
  };

  console.log("setUpdatedText :>> ", updatedText);

  const handleUpdateMessage = async (e) => {
    try {
      const docRef = doc(db, "chatroom", e.target.id);
      await updateDoc(docRef, {
        text: updatedText,
      });
    } catch (error) {
      console.log("error", error);
    }
    handleCloseModal2();
  };

  return (
    <div className="chatroom-container">
      <div className="be-comment-block">
        <h1 className="chatroom-title">Chat Room</h1>
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
                  <div className="be-comment-text">
                    <img
                      src={message.profileImg}
                      alt="Avatar"
                      className="chat-avatar"
                    />
                    <p id="message-text">{message.text}</p>
                  </div>
                  {message.author === user.email ||
                    (message.author === user.displayName && (
                      <div className="pencil-and-trash">
                        <img
                          src={pencil}
                          alt="Edit"
                          id={message.id}
                          onClick={handleShowModal2}
                          className="trash"
                        />
                        <Modal
                          show={showModal2}
                          onHide={handleCloseModal2}
                          id="username-modal"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Please edit your message. You can edit your
                              messages anytime you want.
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <textarea
                              className="form-input"
                              placeholder="Edit your message"
                              defaultValue={message.text}
                              onChange={handleUpdatedMessageInput}
                            ></textarea>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              className="delete-confirm-button"
                              id={message.id}
                              onClick={handleUpdateMessage}
                            >
                              Save
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        <img
                          src={trash}
                          alt="Delete"
                          id={message.id}
                          onClick={handleShowModal}
                          className="trash"
                        />
                        <Modal
                          show={showModal}
                          onHide={handleCloseModal}
                          id="username-modal"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Are you sure you want to delete this message?
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              className="delete-confirm-button"
                              id={message.id}
                              onClick={handleDeleteMessage}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
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
