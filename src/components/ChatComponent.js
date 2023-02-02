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
  const [selectedMessage, setSelectedMessages] = useState([]);
  const [text, setText] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => {
    setSelectedMessages(null);
    setShowEditModal(false);
  };
  const handleShowEditModal = (message) => {
    setSelectedMessages(message);
    setShowEditModal(true);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => {
    setSelectedMessages(null);
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = (message) => {
    setSelectedMessages(message);
    setShowDeleteModal(true);
  };

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
        userid: user.uid,
        avatar: user.photoURL,
      };
      const docRef = await addDoc(collection(db, "chatroom"), msgObj);
      console.log("Document written with ID: ", docRef.id);
      console.log("docRef", docRef);
      setText("");
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
      console.log("delete msgs", e.target.id);
      await deleteDoc(doc(db, "chatroom", e.target.id));
      console.log("successfull :>> ");
    } catch (error) {
      console.log("error", error);
    }
    handleCloseEditModal();
  };

  //edit message

  const handleUpdatedMessageInput = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleUpdateMessage = async (e) => {
    try {
      const docRef = doc(db, "chatroom", e.target.id);
      await updateDoc(docRef, {
        text: updatedText,
      });
    } catch (error) {
      console.log("error", error);
    }
    handleCloseDeleteModal();
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
                  <div className="be-comment-details">
                    <span className="be-comment-avatar">
                      <img
                        src={message.avatar}
                        alt="Avatar"
                        className="chat-avatar"
                      />
                    </span>
                    <span className="be-comment-name">
                      <p>{message.author}</p>
                    </span>
                    <span className="be-comment-time">
                      <p>{msgDate(message.date.seconds)}</p>
                    </span>
                  </div>
                  <div className="be-comment-text">
                    <p id="message-text">{message.text}</p>
                  </div>
                  {message.userid === user?.uid && (
                    <div className="pencil-and-trash">
                      <img
                        src={pencil}
                        alt="Edit"
                        id={message.id}
                        onClick={() => handleShowDeleteModal(message)}
                        className="trash"
                      />

                      <img
                        src={trash}
                        alt="Delete"
                        id={message.id}
                        onClick={() => handleShowEditModal(message)}
                        className="trash"
                      />
                    </div>
                  )}
                </div>
                <hr />
              </div>
            );
          })}
        <Modal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          id="username-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Please edit your message. You can edit your messages anytime you
              want.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              className="form-input"
              placeholder="Edit your message"
              defaultValue={selectedMessage?.text}
              onChange={handleUpdatedMessageInput}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="delete-confirm-button"
              id={selectedMessage?.id}
              onClick={handleUpdateMessage}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
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
              id={selectedMessage?.id}
              onClick={handleDeleteMessage}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <form className="form-block">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <textarea
                    className="form-input"
                    required=""
                    placeholder="Write a comment..."
                    value={text}
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
