import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";
import Home from "./views/Home";
// import ToggleButton from "./components/ToggleButton";
// import Hello from "./components/component1";

import "./assets/styles/style.css";
import Login from "./views/Login";
import Setup2FA from "./views/setup2FA";
import VerifyCode from "./views/VerifyCode";
import Dashboard from "./views/sellers/Dashboard";
import "./App.scss";
import "./assets/styles/style.css";
// import ToggleButton from "./components/ToggleButton";
// import Hello from "./components/component1";
import Chat from "./views/Chat";
import WishList from "./views/WishList";
import UserNotifications from "./views/UserNotifications";
import Profile from "./views/profile";
import Cart from "./views/cart";
import Results from "./views/Results";
import CheckoutFailed from "./views/Checkout/CheckoutFailed";
import CheckoutSuccess from "./views/Checkout/CheckoutSuccess";
import AddProducts from "./views/sellers/AddProduct";
import Products from "./views/sellers/Products";
import EditProduct from "./views/sellers/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/two-fa-setup" element={<Setup2FA />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/seller-home" element={<Dashboard />} />
        <Route path="/seller-products" element={<Products />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/result" element={<Results />} />
        <Route path="/cancel" element={<CheckoutFailed />} />
        <Route path="/success" element={<CheckoutSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
