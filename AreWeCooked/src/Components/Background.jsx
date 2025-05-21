import React from "react";
import "../Styles/background.css";
import backgroundImage from "../img/background.jpg";

function Background() {
  return (
    <div className="background">
      <img src={backgroundImage} alt="bg" className="rotating-background"></img>
    </div>
  );
}

export default Background;
