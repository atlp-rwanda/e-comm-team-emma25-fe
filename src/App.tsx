import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css"
import Home from './views/Home'
import Login from './views/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
