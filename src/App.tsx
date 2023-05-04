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
import Chat from "./views/Chat";
import WishList from "./views/WishList";
import UserNotifications from "./views/UserNotifications";
import Cart from "./views/CartView";
import Results from "./views/Results";
import CheckoutFailed from "./views/Checkout/CheckoutFailed";
import CheckoutSuccess from "./views/Checkout/CheckoutSuccess";
import RoleUpdate from "./views/RoleUpdate";
import ChangePassword from "./views/changepassword";
import ResetPassword from "./views/resetpasswordEmail";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { Notifications } from "./interfaces/Notification";
import { ToastContainer, toast } from "react-toastify";
import EditProduct from "./views/sellers/EditProduct";
import Chatting from "./views/sellers/Chatting";
import SellerNotification from "./views/sellers/SellerNotification";
import Profile from "./views/profile";

function getCookie(name: string): string | undefined {
  const gettoken: string | undefined = Cookies.get(name) as string | undefined;
  return gettoken;
}

function App() {
  const token: string | undefined = getCookie("token");
  const socket = token
    ? io(process.env.BACKEND_LINK as string, { query: { token: token } })
    : undefined;

  socket?.on("notification", (data: Notifications) => {
    toast(`${data.subject} ${data.message} `, {
      type: "info",
    });
  });

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/two-fa-setup" element={<Setup2FA />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/seller-home" element={<Dashboard />} />
          <Route
            path="/seller-home/notifications"
            element={<SellerNotification />}
          />
          <Route path="/seller-home/chat" element={<Chatting />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
