import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SearchContext } from "../store/SearchContext";

function SearchBar({}) {
  const { searchInput, fetchSearchInput } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
    console.log("inputValue :>> ", inputValue);
  };

  const handleClick = () => {
    fetchSearchInput(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchSearchInput(inputValue);
    }
  };

  const { searchDispatch } = useContext(SearchContext);

  const handleHomeClick = () => {
    searchDispatch({ type: "reset" });
  };

  return (
    <div className="d-flex" id="bar-and-button">
      <input
        type="text"
        placeholder="Search a Hero"
        className="input-bar"
        aria-label="Search"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outline-success"
        className="search-button"
        onClick={handleClick}
      >
        Go!
      </Button>
      <Link to="/" onClick={handleHomeClick}>
        <Button variant="outline-success" className="search-button">
          Reset
        </Button>
      </Link>

      {/* {console.log('searchResult', searchResult)} */}
    </div>
  );
}
export default SearchBar;
