import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./views/DetailsPage";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import LoginPage from "./views/LoginPage";
import { SearchContextProvider } from "./store/SearchContext";
import { AuthContextProvider } from "./store/AuthContext";
import ChatRoom from "./views/ChatRoom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { app } from "./config/FirebaseConfig";

function App() {
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
  const ids = [70, 620, 644, 332, 638, 717];
  useEffect(() => {
    // Promise.all([
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/70`),
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/620`),
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/644`),
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/332`),
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/720`),
    //   fetch(`https://www.superheroapi.com/api.php/${apiKey}/659`),
    // ])
    Promise.all(
      ids.map((id) => {
        return fetch(
          `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/${id}`
        ).then((response) => response.json());
      })
    ).then((result) => {
      setDefaultHeroes(result);
    });

    // console.log("app :>> ", app);

    // .then(function (responses) {
    //   console.log("responses :>> ", responses);
    //   return Promise.all(
    //     responses.map(function (response) {
    //       return response.json();
    //     })
    //   );
    // })
    // .then(function (defaultHeroes) {
    //   console.log("Default Heroes: ", defaultHeroes);
    //   setDefaultHeroes(defaultHeroes);
    // })
    // .catch(function (error) {
    //   console.log("error :", error);
    // });
  }, []);

  return (
    <div className="App">
      <AuthContextProvider>
        <SearchContextProvider>
          <Routes>
            <Route path="/" element={<Home defaultHeroes={defaultHeroes} />} />
            <Route
              path="/:id"
              element={
                <ProtectedRoute>
                  <DetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
