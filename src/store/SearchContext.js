import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState(null);

  async function fetchSearchInput(searchInput) {
    try {
      const response = await fetch(
        `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/search/${searchInput}`
      );
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {}
  }

  const resetSearch = () => {
    setSearchResult([]);
  };

  return (
    <SearchContext.Provider
      value={{ searchResult, fetchSearchInput, resetSearch }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
