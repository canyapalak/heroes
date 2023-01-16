import React from "react";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import HeroCards from "./components/HeroCards";
import Navbar from "./components/Navbar";

function App() {
  const [heroes, setHeroes] = useState([]);

  const fetchHeroes = async () => {
    const response = await fetch(
      "https://www.superheroapi.com/api.php/10159060549017724/search/super"
    );
    const result = await response.json();
    console.log("Async result: ", result);
    setHeroes(result.results);
    // const heroOne = result;
    // console.log("allHeroes :>> ", allHeroes);
  };

  useEffect(() => {
    fetchHeroes().catch((error) => console.log("Async error: ", error));
  }, []);

  return (
    <div className="home">
      <Navbar heroes={heroes}></Navbar>
      <HeroCards heroes={heroes}></HeroCards>
      <Footer />
    </div>
  );
}
export default App;
