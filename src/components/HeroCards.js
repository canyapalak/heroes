import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function HeroCards({ heroes }) {
  console.log(heroes);
  const eachHero = heroes.map((hero) => (
    <li key={hero.id}>
      <span movie={hero}></span>
    </li>
  ));

  return <ul className="hero-list">{eachHero}</ul>;
}

export default HeroCards;
