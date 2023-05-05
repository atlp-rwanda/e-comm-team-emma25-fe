import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "../../components/DrawerComp";
import Products from "./Products";
import Profile from "../Profile/Profile";
import { Link, useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Chatting from "./Chatting";
import SellerNotification from "./SellerNotification";
import Cookies from "js-cookie";


const PAGES = ["Products", "Orders", "Profile", "Chat", "Notifications"];

const Dashboard = () => {
  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = () => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";

    Cookies.remove("token");
    navigate("/");

  };

  return (
    <React.Fragment>
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              !SHOP
            </Link>
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} value={page} />
                ))}
              </Tabs>
              <Button
                sx={{ marginLeft: "auto", color: "primary" }}
                variant="contained"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* body content */}
      {value === "Products" && <ProductContent />}
      {value === "Orders" && <Orders />}
      {value === "Profile" && <ProfileContent />}
      {value == "Chat" && <Chatting />}
      {value == "Notifications" && <SellerNotification />}
    </React.Fragment>
  );
};

const ProductContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/seller-home");
  }, [navigate]);

  return <Products />;
};

const Orders = () => {
  return <div>Orders</div>;
};

const ProfileContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/profile");
  }, [navigate]);

  return <Profile />;
};

export default Dashboard;
