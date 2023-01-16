import React from "react";
import { useState, useEffect } from "react";
import BurgerMenu from "./components/BurgerMenu";
import Footer from "./components/Footer";
import HeroCards from "./components/HeroCards";
import Navbar from "./components/Navbar";

function App() {
  const [heroes, setHeroes] = useState([]);

  // API KEY: 10159060549017724

  const fetchHeroes = async () => {
    const response = await fetch(
      "https://www.superheroapi.com/api.php/10159060549017724/search/bo"
    );
    const result = await response.json();
    console.log("Async result: ", result);
    setHeroes(result.results);
  };

  useEffect(() => {
    fetchHeroes().catch((error) => console.log("Async error: ", error));
  }, []);

  return (
    <div className="home">
      <BurgerMenu />
      <Navbar />
      <HeroCards heroes={heroes} />
      <Footer />
    </div>
  );
}
export default App;
