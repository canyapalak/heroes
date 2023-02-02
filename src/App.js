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
import ProfilePage from "./views/ProfilePage";

function App() {
  const [defaultHeroes, setDefaultHeroes] = useState([]);
  const ids = [70, 620, 644, 332, 157, 263];
  useEffect(() => {
    // Promise.all([

    Promise.all(
      ids.map((id) => {
        return fetch(
          `https://www.superheroapi.com/api.php/${process.env.REACT_APP_APIKEY}/${id}`
        ).then((response) => response.json());
      })
    ).then((result) => {
      setDefaultHeroes(result);
      console.log("defaultHeroes :>> ", defaultHeroes);
    });
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
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
