import React from "react";
import Card from "react-bootstrap/Card";

function HeroCards({ heroes }) {
  return (
    <div className="heroes-container">
      {heroes.map((hero) => (
        <Card style={{ width: "17rem" }} id="hero-card" key={hero.id}>
          <Card.Img variant="top" src={hero.image.url} id="card-img" />
          <Card.Body>
            <Card.Title id="card-name">{hero.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HeroCards;
