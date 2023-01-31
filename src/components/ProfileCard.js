import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { storage } from "../config/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import avatarPlaceholder from "./assets/avatar-placeholder.png";
import { useEffect } from "react";

function ProfileCard() {
  const { user, currentUser } = useContext(AuthContext);
  console.log("user :>> ", user);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [newUsername, setNewUsername] = useState("");
  const [isUserName, setIsUsername] = useState(null);
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  const [newImg, setNewImg] = useState(null);
  const [url, setUrl] = useState(null);

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

  console.log("newImg", newImg);

  const changeUserImg = () => {
    const imageRef = ref(storage, newImg);
    uploadBytes(imageRef, newImg)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
            currentUser();

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

  // function changeUserImg() {
  //   const auth = getAuth();
  //   const storageRef = heroes.storage().ref();
  //   const fileRef = storageRef.child(`images/${auth.currentUser.uid}`);
  //   fileRef.put(newImg).then(() => {
  //     fileRef.getDownloadURL().then((url) => {
  //       updateProfile(auth.currentUser, {
  //         photoURL: url,
  //       })
  //         .then(() => {
  //           console.log("Profile picture updated");
  //         })
  //         .catch((error) => {
  //           console.log("error", error);
  //         });
  //     });
  //   });
  // }

  return (
    <>
      <Card className="profile-card">
        <Card.Title id="profile-name">
          <p>Profile</p>
        </Card.Title>
        <Card.Body>
          <div className="profile-details">
            <img
              src={user?.photoURL}
              alt="Profile Picture"
              id="profile-picture"
            />
            <Button
              variant="outline-success"
              className="profile-picture-button"
              onClick={handleShowModalImg}
            >
              Change
            </Button>
            <Modal
              show={showModalImg}
              onHide={handleCloseModalImg}
              id="username-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Please upload an image as your new profile picture.
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="file"
                  className="form-control"
                  id="upload-image"
                  onChange={handleImageInput}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  id="username-modal-save"
                  onClick={changeUserImg}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

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
              <p id="small-detail">{user?.metadata?.creationTime}</p>
            </span>
            <span className="detail-line">
              <p id="small-title">Last Log In:</p>
              <p id="small-detail">{user?.metadata?.lastSignInTime}</p>
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
