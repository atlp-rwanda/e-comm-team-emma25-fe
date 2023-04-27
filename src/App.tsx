import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/style.css";
import Home from "./views/Home";
import "./assets/styles/style.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Setup2FA from "./views/setup2FA";
import VerifyCode from "./views/VerifyCode";
import Dashboard from "./views/sellers/Dashboard";
import "./App.scss";
import SellerProfile from "./views/sellers/SellerProfile";
import AddProducts from "./views/sellers/AddProduct";
import "./assets/styles/style.css";
import Chat from "./views/Chat";
import WishList from "./views/WishList";
import UserNotifications from "./views/UserNotifications";
import Cart from "./views/cart";
import Results from "./views/Results";
import CheckoutFailed from "./views/Checkout/CheckoutFailed";
import CheckoutSuccess from "./views/Checkout/CheckoutSuccess";
import RoleUpdate from "./views/RoleUpdate";
import ChangePassword from "./views/changepassword";
import ResetPassword from "./views/resetpasswordEmail";
// import ResetPassword from "./views/resetpasswordEmail";
// import SignIn from "./views/Login";
import EditProduct from "./views/sellers/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/two-fa-setup" element={<Setup2FA />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/seller-home" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/result" element={<Results />} />
        <Route path="/cancel" element={<CheckoutFailed />} />
        <Route path="/success" element={<CheckoutSuccess />} />
        <Route path="/role-update" element={<RoleUpdate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
