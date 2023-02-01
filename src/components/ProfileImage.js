import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { storage } from "../config/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import avatarPlaceholder from "./assets/avatar-placeholder.png";
import { useEffect } from "react";

function ProfileImage() {
  const { user } = useContext(AuthContext);
  const [showModalImg, setShowModalImg] = useState(false);
  const handleCloseModalImg = () => setShowModalImg(false);
  const handleShowModalImg = () => setShowModalImg(true);
  const [newImg, setNewImg] = useState(null);

  const handleImageInput = (e) => {
    if (e.target.files[0]) {
      console.log(" e.target", e);
      setNewImg(e.target.files[0]);
    }
  };

  const changeUserImg = async () => {
    const imageRef = ref(storage, newImg.name);
    try {
      await uploadBytes(imageRef, newImg);
      const url = await getDownloadURL(imageRef);
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      handleCloseModalImg();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="profile-details">
        <img
          src={user?.photoURL || avatarPlaceholder}
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
      </div>
    </>
  );
}

export default ProfileImage;
