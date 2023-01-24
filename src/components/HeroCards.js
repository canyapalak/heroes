import Card from "react-bootstrap/Card";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import HeroPlaceholder from "./assets/hero-placeholder.jpg";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../store/SearchContext";

function HeroCards({ defaultHeroes }) {


  const { searchResult } = useContext(SearchContext)
  
  const onImageError = (e) => {
    e.target.src = HeroPlaceholder;
  };

const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    if (searchResult && searchResult.results && searchResult.results.length > 0 && searchResult !==null) {
        setHeroes(searchResult.results);
    } else {
      setHeroes([])
    }
  }, [searchResult]);

  useEffect(() => {
    setHeroes(defaultHeroes);
  }, [defaultHeroes]);
  
  
  return (
    <div className="heroes-and-search">
      <SearchBar />
      <div className="heroes-container">
{ heroes.length > 0 ? 
    heroes.map((hero) => (
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
    )) :
          <div className="no-heroes-found"><p>No heroes found. Try another search.</p></div>
}
      </div>
    </div>)

}

export default HeroCards;