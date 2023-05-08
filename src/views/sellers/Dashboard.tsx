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
import { useNavigate } from "react-router-dom";
import Chatting from "./Chatting";
import SellerNotification from "./SellerNotification";
import Cookies from "js-cookie";
import Sellerorders from "../Sellerorders";
import { getCookie } from "../../interfaces/functions";
import ProfileComp from "../Profile/profilecomponetn";

const PAGES = ["Products", "Orders", "Profile", "Chat", "Notifications"];

const Dashboard = () => {
  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const token: string | undefined = getCookie("token");
  if (token) {
    const role: string | undefined = getCookie("role");
    if (role) {
      if (role !== "seller") {
        Cookies.remove("token");
        Cookies.remove("role");
        window.location.href = "/login";
      }
    }
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear(); // Clear all items in localStorage
    navigate("/");
  };

  return (
    <React.Fragment>
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            !SHOP
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
                sx={{ marginLeft: "auto", backgroundColor: "#1A120B" }}
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
      {value === "Orders" && <Sellerorders />}
      {value === "Profile" && <ProfileComp />}
      {value == "Chat" && <Chatting />}
      {value == "Notifications" && <SellerNotification />}
    </React.Fragment>
  );
};

const ProductContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/seller-home");
  }, []);

  return <Products />;
};

export default Dashboard;
