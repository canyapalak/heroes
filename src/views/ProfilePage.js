import React from "react";
import BurgerMenu from "../components/BurgerMenu";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
  return (
    <div className="profile-page">
      <BurgerMenu />
      <NavigationBar />
      <ProfileCard />
      <Footer />
    </div>
  );
}

export default ProfilePage;
