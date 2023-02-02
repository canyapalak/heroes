import React, { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db, storage } from "../config/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import { useEffect } from "react";
import ProfileImage from "./ProfileImage";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

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

  const onImageError = (e) => {
    e.target.src = HeroPlaceholder;
  };

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

  const msgDate = (dateAndTime) => {
    const date = new Date(dateAndTime).toLocaleDateString();
    const time = new Date(dateAndTime).toLocaleTimeString();
    return (
      <>
        {date} {time}
      </>
    );
  };

  //calling favorites

  const [profileFavHeroes, setProfileFavHeroes] = useState([]);

  useEffect(() => {
    getHeroesArray().then((heroesArray) => {
      Promise.all(
        heroesArray.map((id) => {
          return fetch(
            `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/${id}`
          ).then((response) => response.json());
        })
      ).then((result) => {
        setProfileFavHeroes(result);
      });
    });
  }, []);

  const getHeroesArray = async () => {
    const favRef = doc(db, "favorites", user.uid);

    const favSnap = await getDoc(favRef);
    const heroesArray =
      favSnap._document.data.value.mapValue.fields.heroes.arrayValue.values;
    console.log("heroesArray :>> ", heroesArray);

    if (heroesArray.length > 0) {
      return heroesArray.map((item) => item.stringValue);
    }
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
          </div>
          <div className="favorites-section">
            {profileFavHeroes.length > 0 ? (
              profileFavHeroes.map((favHero) => (
                <Link to={`/${favHero.id}`} key={favHero.id}>
                  <Card className="fav-card">
                    <Card.Img
                      src={favHero.image.url}
                      id="fav-img"
                      onError={onImageError}
                      alt={favHero.name}
                    />
                    <Card.Body>
                      <Card.Title id="fav-name">{favHero.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="no-favs-found">
                <p>You have no favorite heroes.</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
