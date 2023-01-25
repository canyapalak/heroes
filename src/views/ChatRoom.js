import React from "react";
import BurgerMenu from "../components/BurgerMenu";
import ChatComponent from "../components/ChatComponent";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

function ChatRoom() {
  return (
    <div div className="chat-room">
      <BurgerMenu />
      <NavigationBar />
      <ChatComponent />
      <Footer />
    </div>
  );
}

export default ChatRoom;
