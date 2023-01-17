import React from "react";
import BurgerMenu from "../components/BurgerMenu";
import Footer from "../components/Footer";
import HeroDetails from "../components/HeroDetails";
import NavigationBar from "../components/NavigationBar";

function DetailsPage() {
  return (
    <div className="hero-details">
      <BurgerMenu />
      <NavigationBar />
      <HeroDetails />
      <Footer />
    </div>
  );
}
export default DetailsPage;
