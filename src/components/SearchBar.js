import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { SearchContext } from "../context/SearchContext";

function SearchBar({}) {
  
  const { searchResult, fetchSearchInput} = useContext(SearchContext)
  const [inputValue, setInputValue] = useState('')
  // const [searchInput, setSearchInput] = useState([]); // let's set this state in the parent component

  // const apiKey = "10159060549017724";

  // const fetchSearchedHeroes = async () => {
  //   const response = await fetch(
  //     `https://www.superheroapi.com/api.php/${apiKey}/search/${searchInput}`
  //   );
  //   const result = await response.json();
  //   console.log("Async result: ", result);
  //   setSearchedHeroes(result.results);
  // };
//   const submitInput = (e) => {
// e.preventDefault()
// getInput(e.target.value)
//   }
  const handleChange = (e) => {
    setInputValue(e.target.value)
    // console.log('inputValue :>> ', inputValue);
  }

  const handleClick = () => {
fetchSearchInput(inputValue)
  }
    

  return (
    <div className="d-flex" id="bar-and-button">
      <input
        type="text"
        placeholder="Search a Hero"
        className="input-bar"
        aria-label="Search"
        onChange={handleChange}
      />
      <Button
        variant="outline-success"
        className="search-button"
        onClick={handleClick}
      >
        {" "}
        Go!
      </Button>{" "}
      {console.log('searchResult', searchResult)}
    </div>
  );
}
export default SearchBar;
