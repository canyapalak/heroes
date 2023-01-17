//import useParams
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
          <p>{oneHero.occupation}</p>
          <img src={oneHero.image.url} alt={oneHero.name} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroDetails;
