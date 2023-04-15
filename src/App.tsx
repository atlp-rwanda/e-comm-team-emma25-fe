import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Setup2FA from "./views/setup2FA";
import VerifyCode from "./views/VerifyCode";
import Dashboard from "./views/sellers/Dashboard";
import "./App.scss";
import "./assets/styles/style.css"
import Home from './views/Home'
import Login from './views/Login';
// import ToggleButton from "./components/ToggleButton";
// import Hello from "./components/component1";
import WishList from './views/WishList';

function App() {
  return (    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/two-fa-setup" element={<Setup2FA />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/seller-home" element={<Dashboard />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
