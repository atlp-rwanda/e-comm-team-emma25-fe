import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";
import Home from "./views/Home";
import Login from "./views/Login";
import ToggleButton from "./components/ToggleButton";
import Hello from "./components/component1";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" Component={Home}/>
      </Routes>
      <div className="sass">
        <Hello />
        <h1>FRONT-END</h1>
        <ToggleButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
