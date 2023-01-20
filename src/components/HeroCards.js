import Card from "react-bootstrap/Card";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";

function HeroCards({ defaultHeroes }) {

  const { searchResult } = useContext(SearchContext)
  
  const [searchInput, setSearchInput] = useState([]);
  const [searchedHeroes, setSearchedHeroes] = useState(defaultHeroes)

  const onImageError = (e) => {
    e.target.src = HeroPlaceholder;
  };

  const getInput = (input) => {
    console.log('input :>> ', input);
    setSearchInput(input)
  }
  const searchHeroes = () => {
    const searchedHeroesArray = defaultHeroes.filter((defaultHero) => 
    { return defaultHero.name.includes(searchInput) })
    console.log('searchedHeroesArray', searchedHeroesArray)
    setSearchedHeroes(searchedHeroesArray)
  }

  useEffect(() => {
    searchHeroes()
  }, [defaultHeroes])
  
  return (
    
    <div className="heroes-and-search">
      <SearchBar getInput={getInput} />
      <div className="heroes-container">
        {searchedHeroes &&
          searchedHeroes.map((hero) => (
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
