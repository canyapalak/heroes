import React from "react";
import Card from "react-bootstrap/Card";
import SearchBar from "./SearchBar";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";

function HeroCards({ heroes }) {
  const onImageError = (e) => {
    e.target.src = HeroPlaceholder;
  };

  return (
    <div className="heroes-and-search">
      <SearchBar />
      <div className="heroes-container">
        {heroes.map((hero) => (
          <Card style={{ width: "16rem" }} className="hero-card" key={hero.id}>
            <Card.Img
              variant="top"
              src={hero.image.url}
              id="card-img"
              onError={onImageError}
            />
            <Card.Body>
              <Card.Title id="card-name">{hero.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HeroCards;
