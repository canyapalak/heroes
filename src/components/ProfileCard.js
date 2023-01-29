import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../store/AuthContext";

function ProfileCard() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  return (
    <>
      <Card className="profile-card">
        <Card.Title id="profile-name">
          <p>Profile</p>
        </Card.Title>
        <Card.Body>
          <p>{user.metadata.creationTime}</p>
          <p>{user.metadata.lastSignInTime}</p>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
