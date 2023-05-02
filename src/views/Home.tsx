import React from "react";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import AllProducts from "../components/AllProducts";

function Home() {
  return (
    <div>
      <Navbar iconNumber={1} />
      <LandingPage />
      <AllProducts />
    </div>
  );
}

export default Home;
