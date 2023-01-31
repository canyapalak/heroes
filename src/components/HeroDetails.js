import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import FavEmpty from "./assets/fav-empty.png";

function HeroDetails() {
  const [oneHero, setOneHero] = useState("");

  const { id } = useParams();

  const fetchOneHero = async () => {
    const response = await fetch(
      `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/${id}`
    );
    const result = await response.json();
    console.log("Async result: ", result);
    setOneHero(result);
  };

  useEffect(() => {
    fetchOneHero().catch((error) => console.log("Async error: ", error));
  }, []);

  const onImageError2 = (e) => {
    e.target.src = HeroPlaceholder;
  };

  const gradArray = ["st-1", "st-2", "st-3", "st-4", "st-5", "st-6"];

  return (
    <div className="details-container">
      {oneHero ? (
        <>
          <Card className="details-card">
            <Card.Title id="details-name">
              <p id=";details-name">{oneHero.name}</p>
            </Card.Title>
            <Card.Body>
              <div className="image-and-stats">
                <img
                  src={oneHero.image.url}
                  alt={oneHero.name}
                  onError={onImageError2}
                  id="details-image"
                />
                <img src={FavEmpty} alt="Not Fav" id="fav-empty" />
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
