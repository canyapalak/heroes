//import useParamsimport { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";

function HeroDetails() {
  const [oneHero, setOneHero] = useState("");

  const { id } = useParams();

  const fetchOneHero = async () => {
    const response = await fetch(
      `https://www.superheroapi.com/api.php/10159060549017724/${id}`
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

  return (
    <div className="details-container">
      {oneHero ? (
        <>
          <Card style={{ width: "35rem" }} className="hero-details">
            <h1>{oneHero.name}</h1>
            <p>{oneHero.work.occupation}</p>
            <img
              src={oneHero.image.url}
              alt={oneHero.name}
              onError={onImageError2}
            />
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroDetails;
