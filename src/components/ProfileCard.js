import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import avatarPlaceholder from "./assets/avatar-placeholder.png";
import { useEffect } from "react";

function ProfileCard() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [newUsername, setNewUsername] = useState("");
  const [isUserName, setIsUsername] = useState(null);

  useEffect(() => {
    checkUsername();
  }, [isUserName]);

  const checkUsername = () => {
    if (user.displayName) {
      setIsUsername(true);
    } else {
      setIsUsername(false);
    }
  };

  if (user.photoURL === null) {
    user.photoURL = avatarPlaceholder;
  }

  const handleUsernameInput = (e) => {
    setNewUsername(e.target.value);
  };

  function changeUsername() {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: newUsername,
    })
      .then(() => {
        console.log("Profile updated");
        setIsUsername(true);
        // ...
      })
      .catch((error) => {
        console.log("error", error);
        // ...
      });
  }

  return (
    <>
      <Card className="profile-card">
        <Card.Title id="profile-name">
          <p>Profile</p>
        </Card.Title>
        <Card.Body>
          <div className="profile-details">
            <img
              src={user.photoURL}
              alt="Profile Picture"
              id="profile-picture"
            />
            <Button
              variant="outline-success"
              className="profile-picture-button"
            >
              Change
            </Button>
            <span className="detail-line">
              <p id="small-title">Username:</p>
              {isUserName ? (
                <p id="small-detail">{user.displayName}</p>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={handleShowModal}
                    id="username-button"
                  >
                    Set a Username
                  </Button>
                  <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    id="username-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        You can set your username only once!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input
                        type="text"
                        placeholder="Your Username"
                        className="username-input"
                        onChange={handleUsernameInput}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        id="username-modal-save"
                        onClick={changeUsername}
                      >
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </span>
            <span className="detail-line">
              <p id="small-title">E-Mail Address:</p>
              <p id="small-detail">{user.email}</p>
            </span>
            <span className="detail-line">
              <p id="small-title">Registered Since:</p>
              <p id="small-detail">{user.metadata.creationTime}</p>
            </span>
            <span className="detail-line">
              <p id="small-title">Last Log In:</p>
              <p id="small-detail">{user.metadata.lastSignInTime}</p>
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
