import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { storage } from "../config/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import avatarPlaceholder from "./assets/avatar-placeholder.png";
import { useEffect } from "react";
import ProfileImage from "./ProfileImage";

function ProfileCard() {
  const { user } = useContext(AuthContext);

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

  //set a username

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

  //set a profile picture

  const handleImageInput = (e) => {
    if (e.target.files[0]) {
      console.log(" e.target", e);
      setNewImg(e.target.files[0]);
    }
  };

  const changeUserImg = () => {
    const imageRef = ref(storage, newImg.name);
    uploadBytes(imageRef, newImg)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              photoURL: url,
            });

            handleCloseModalImg();
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const msgDate = (dateAndTime) => {
    const date = new Date(dateAndTime).toLocaleDateString();
    const time = new Date(dateAndTime).toLocaleTimeString();
    return (
      <>
        {date} {time}
      </>
    );
  };

  return (
    <>
      <Card className="profile-card">
        <Card.Title id="profile-name">
          <p>Profile</p>
        </Card.Title>
        <Card.Body>
          <div className="profile-details">
            <ProfileImage />
            <p id="sub-titles">Details</p>
            <span className="detail-line">
              <p id="small-title">Username:</p>
              {isUserName ? (
                <p id="small-detail">{user?.displayName}</p>
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
              <p id="small-detail">{user?.email}</p>
            </span>
            <span className="detail-line">
              <p id="small-title">Registered Since:</p>
              <p id="small-detail">{msgDate(user?.metadata?.creationTime)}</p>
            </span>
            <span className="detail-line">
              <p id="small-title">Last Log In:</p>
              <p id="small-detail">{msgDate(user?.metadata?.lastSignInTime)}</p>
            </span>
            <div className="stats"></div>
            <p id="sub-titles">Favorites</p>
            <span id="small-parts">
              <p id="small-titles">hgdsjhgd </p>
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
