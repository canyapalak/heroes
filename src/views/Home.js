import React from "react";
import BurgerMenu from "../components/BurgerMenu";
import Footer from "../components/Footer";
import HeroCards from "../components/HeroCards";
import NavigationBar from "../components/NavigationBar";

function Home({ defaultHeroes }) {
  return (
    <div className="home">
      <BurgerMenu />
      <NavigationBar />
      <HeroCards defaultHeroes={defaultHeroes} />
      <Footer />
    </div>
  );
}
export default Home;
