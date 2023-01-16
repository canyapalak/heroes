import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import flashNoBg from "./assets/flash-no-bg.png";

function Footer() {
  return (
    <MDBFooter className="text-center text-lg-left" id="footer">
      <div className="text-center p-3" id="footer-text">
        <img src={flashNoBg} alt="Lightning" id="footer-flash"></img>
        <p>
          Heroes APP ® 2023 by{" "}
          <a
            href="https://github.com/canyapalak"
            target="_blank"
            rel="noreferrer"
          >
            Can Yapalak
          </a>
        </p>
        <p>
          Powered by{" "}
          <a href="https://superheroapi.com/" target="_blank" rel="noreferrer">
            SuperHero API
          </a>
        </p>
      </div>
    </MDBFooter>
  );
}

export default Footer;
