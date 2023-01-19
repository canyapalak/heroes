import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function SearchBar({getInput}) {
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
  const submitInput = (e) => {
e.preventDefault()
getInput(e.target.value)
  }

  return (
    <div className="d-flex" id="bar-and-button">
      <input
        type="text"
        placeholder="Search a Hero"
        className="input-bar"
        aria-label="Search"
        onInput={submitInput}
      />
      <Button
        variant="outline-success"
        className="search-button"
        onClick={(e) => {
          console.log('e.target :>> ', e.target);
          getInput(e.target.value)
        }}
      >
        {" "}
        Go!
      </Button>{" "}
    </div>
  );
}
export default SearchBar;
