import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";
import Home from "./views/Home";
import Login from "./views/Login";
import ToggleButton from "./components/ToggleButton";

import "./App.scss";
import Navbar from "./components/narbar/navbar";
import Signin from "./components/login/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div className="sass">
        {/* <h1>FRONT-END</h1> */}
        <ToggleButton />
        <Navbar />
        <Signin />
      </div>
    </BrowserRouter>
  );
}

export default App;
