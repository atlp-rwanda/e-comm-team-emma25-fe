import React from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/bottomNav.css";

function WishList() {
  return (
    <div>
      <Navbar iconNumber={5} />
      <div className="secondoption">
        <p>main this is supposed to be big and enought</p>
      </div>
      <div className="secondoption"></div>
    </div>
  );
}

export default WishList;
