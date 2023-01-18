import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./views/DetailsPage";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";

function App() {
  const [heroes, setHeroes] = useState([]);

  const apiKey = "10159060549017724";

  const fetchHeroes = async () => {
    const response = await fetch(
      `https://www.superheroapi.com/api.php/${apiKey}/search/super`
    );
    const result = await response.json();
    console.log("Async result: ", result);
    setHeroes(result.results);
  };

  useEffect(() => {
    fetchHeroes().catch((error) => console.log("Async error: ", error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home heroes={heroes} />} />
        <Route path="/:id" element={<DetailsPage heroes={heroes} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
export default App;
