import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/components/styles/BurgerMenu.css";
import "../src/components/styles/Footer.css";
import "../src/components/styles/HeroCards.css";
import "../src/components/styles/HeroDetails.css";
import "../src/components/styles/NavigationBar.css";
import "../src/components/styles/SearchBar.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
