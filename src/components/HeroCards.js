import Card from "react-bootstrap/Card";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import { useEffect, useState } from "react";

function HeroCards({ defaultHeroes }) {
  const [searchInput, setSearchInput] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState(defaultHeroes)
  const onImageError = (e) => {
    e.target.src = HeroPlaceholder;
  };

  const getInput = (input) => {
    console.log('input :>> ', input);
    setSearchInput(input)
  }
  const filterHeroes = () => {
    const filteredHeroesArray = defaultHeroes.filter((defaultHero) => 
    { return defaultHero.name.includes(searchInput) })
    console.log('filteredHeroesArray', filteredHeroesArray)
    setFilteredHeroes(filteredHeroesArray)
  }

  useEffect(() => {
    filterHeroes()
  }, [searchInput, filterHeroes])
  
  return (
    
    <div className="heroes-and-search">
      <SearchBar getInput={getInput} />
      <div className="heroes-container">
        {filteredHeroes &&
          filteredHeroes.map((hero) => (
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
