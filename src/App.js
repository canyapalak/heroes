import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./views/DetailsPage";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";

function App() {
  const apiKey = "10159060549017724";

  // PREVIOUS FETCH WITH SEARCH ENDPOINT

  // const [heroes, setHeroes] = useState([]);
  // const fetchHeroes = async () => {
  //   const response = await fetch(
  //     `https://www.superheroapi.com/api.php/${apiKey}/search/super`
  //   );
  //   const result = await response.json();
  //   console.log("Async result: ", result);
  //   setHeroes(result.results);
  // };

  // FETCH SPECIFIC HEROES WITH PROMISE.ALL

  const [defaultHeroes, setDefaultHeroes] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/70`),
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/620`),
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/644`),
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/332`),
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/720`),
      fetch(`https://www.superheroapi.com/api.php/${apiKey}/659`),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (defaultHeroes) {
        console.log("Default Heroes: ", defaultHeroes);
        setDefaultHeroes(defaultHeroes);
      })
      .catch(function (error) {
        console.log("error :", error);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home defaultHeroes={defaultHeroes} />} />
        <Route path="/:id" element={<DetailsPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
export default App;
