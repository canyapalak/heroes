import {
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";
import { db } from "../config/FirebaseConfig";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import IconEmpty from "./assets/icon-empty.png";
import IconFull from "./assets/icon-full.png";
import BackButton from "./assets/back-button.png";

function HeroDetails() {
  const { user } = useContext(AuthContext);
  const [oneHero, setOneHero] = useState("");

  const { id } = useParams();

  const fetchOneHero = async () => {
    const response = await fetch(
      `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/${id}`
    );
    const result = await response.json();
    setOneHero(result);
  };

  useEffect(() => {
    fetchOneHero().catch((error) => console.log("Async error: ", error));
    checkToggle();
  }, []);

  const onImageError2 = (e) => {
    e.target.src = HeroPlaceholder;
  };

  const gradArray = ["st-1", "st-2", "st-3", "st-4", "st-5", "st-6"];

  //favorites

  const [isToggled, setIsToggled] = useState(false);

  const checkToggle = async () => {
    const favRef = doc(db, "favorites", user.uid);

    const favSnap = await getDoc(favRef);
    console.log("favSnap", favSnap);
    const heroesArray =
      favSnap._document.data.value.mapValue.fields.heroes.arrayValue.values;

    const isInFavorites = heroesArray.find((hero) => hero.stringValue === id);
    setIsToggled(isInFavorites);
  };

  function setToggle() {
    if (!isToggled) {
      console.log("hero id", id);

      const createFavDoc = async () => {
        //first check if doc exists
        try {
          const favRef = doc(db, "favorites", user.uid);
          const favSnap = await getDoc(favRef);

          //if doc exists, update it

          if (favSnap.exists()) {
            try {
              await updateDoc(doc(db, "favorites", user.uid), {
                heroes: arrayUnion(id),
              });
              console.log("document updated");
              setIsToggled(true);
            } catch (e) {
              console.log("error :>> ", e);
            }
            //if doc doesnt exist, create it
          } else {
            try {
              await setDoc(doc(db, "favorites", user.uid), {
                heroes: [id],
              });
              console.log("document added");
              setIsToggled(true);
            } catch (e) {
              console.log("error :>> ", e);
            }
          }
        } catch (error) {}
      };
      createFavDoc();
    }

    if (isToggled) {
      const removeFav = async () => {
        try {
          const favRef = doc(db, "favorites", user.uid);
          const favSnap = await getDoc(favRef);
          if (favSnap.exists()) {
            try {
              await updateDoc(doc(db, "favorites", user.uid), {
                heroes: arrayRemove(id),
              });
              console.log("document updated");
              setIsToggled(false);
            } catch (e) {
              console.log("error :>> ", e);
            }
          }
        } catch (error) {
          console.log("error :>> ", e);
        }
      };
      removeFav();
    }
  }

  const navigate = useNavigate();

  return (
    <div className="details-container">
      {oneHero ? (
        <>
          <Card className="details-card">
            <div className="back-and-star">
              <div className="back-button">
                <img src={BackButton} alt="Back" onClick={() => navigate(-1)} />
              </div>
              <div onClick={setToggle} className="star-icon">
                {!isToggled ? (
                  <img src={IconEmpty} alt="Not Favorite" />
                ) : (
                  <img src={IconFull} alt="Favorite" />
                )}
              </div>
            </div>
            <Card.Title id="details-title">
              <p id="details-name">{oneHero.name}</p>
            </Card.Title>
            <Card.Body>
              <div className="image-and-stats">
                <div>
                  <img
                    src={oneHero.image.url}
                    alt={oneHero.name}
                    onError={onImageError2}
                    id="details-image"
                  />
                </div>
                <div className="stats">
                  <p id="sub-titles">Powerstats</p>

                  {Object.entries(oneHero.powerstats).map((entry, i) => {
                    if (
                      entry[1] === "null" ||
                      entry[1] === "-" ||
                      entry[1] === ""
                    )
                      return <p>{entry[0] + " : No data found"}</p>;
                    return (
                      <div key={i}>
                        <p id="each-stat-title">{entry[0]}</p>
                        <div className="stats-holder">
                          <div
                            className={`Powerstats ${gradArray[i]}`}
                            style={{ width: `${entry[1]}%` }}
                          >
                            {entry[1] + " %"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p id="sub-titles">Biography</p>
                <span id="small-parts">
                  <p id="small-titles">Full Name: </p>
                  <p id="small-info">{oneHero.biography["full-name"]}</p>
                </span>
                <span id="small-parts">
                  <p id="small-titles">Alter Egos: </p>
                  <p id="small-info">{oneHero.biography["alter-egos"]}</p>
                </span>
                <span id="small-parts">
                  <p id="small-titles">Place of Birth: </p>
                  <p id="small-info">{oneHero.biography["place-of-birth"]}</p>
                </span>
                <span id="small-parts">
                  <p id="small-titles">First Appearance: </p>
                  <p id="small-info">{oneHero.biography["first-appearance"]}</p>
                </span>
                <span id="small-parts">
                  <p id="small-titles">Publisher: </p>
                  <p id="small-info">{oneHero.biography.publisher}</p>
                </span>
                <span id="small-parts">
                  <p id="small-titles">Alignment: </p>
                  <p id="small-info">{oneHero.biography.alignment}</p>
                </span>
                <div className="appearance">
                  <p id="sub-titles">Appearance</p>
                  <span id="small-parts">
                    <p id="small-titles">Gender: </p>
                    <p id="small-info">{oneHero.appearance.gender}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Race: </p>
                    <p id="small-info">{oneHero.appearance.race}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Eye Color: </p>
                    <p id="small-info">{oneHero.appearance["eye-color"]}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Hair Color: </p>
                    <p id="small-info">{oneHero.appearance["hair-color"]}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Height: </p>
                    <p id="small-info">{oneHero.appearance.height[1]}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Weight: </p>
                    <p id="small-info">{oneHero.appearance.weight[1]}</p>
                  </span>
                </div>
                <div className="work">
                  <p id="sub-titles">Work</p>
                  <span id="small-parts">
                    <p id="small-titles">Occupation: </p>
                    <p id="small-info">{oneHero.work.occupation}</p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Base: </p>
                    <p id="small-info">{oneHero.work.base}</p>
                  </span>
                </div>
                <div className="connections">
                  <p id="sub-titles">Connections</p>
                  <span id="small-parts">
                    <p id="small-titles">Group Affiliation: </p>
                    <p id="small-info">
                      {oneHero.connections["group-affiliation"]}
                    </p>
                  </span>
                  <span id="small-parts">
                    <p id="small-titles">Relatives: </p>
                    <p id="small-info">{oneHero.connections.relatives}</p>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroDetails;
