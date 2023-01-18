import React from "react";
import Card from "react-bootstrap/Card";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
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
          <Link to={hero.id} key={hero.id}>
            <Card style={{ width: "16rem" }} className="hero-card">
              <Card.Img
                src={hero.image.url}
                id="card-img"
                onError={onImageError}
                alt={hero.name}
              />
              <Card.Body>
                <Card.Title id="card-name">{hero.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroCards;
