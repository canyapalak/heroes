import React from "react";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroCards from "./components/HeroCards";

function App() {
  const fetchAllHeroes = async () => {
    const response = await fetch(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    const result = await response.json();
    // console.log("Async result: ", result);
    const allHeroes = result;
    console.log("allHeroes :>> ", allHeroes);
  };

  fetchAllHeroes().catch((error) => console.log("Async error: ", error));

  // const [heroes, setHeroes] = useState([]);
  // const [searchQuery, setSearchQuery] = useState([]);

  // const fetchAllHeroes = useCallback(async () => {
  //   const data = await fetch(
  //     "https://akabab.github.io/superhero-api/api/all.json"
  //   )
  //     .then((response) => response.json())
  //     .catch((error) => console.log("Classic error: ", error));
  //   console.log("data", data);
  //   setHeroes(data);
  // }, [searchQuery]);

  // useEffect(() => {
  //   fetchAllHeroes();
  // }, [fetchAllHeroes]);

  return (
    <div className="home">
      <Navbar />;
      <HeroCards allHeroes={allHeroes} />;
    </div>
  );
}
export default App;
