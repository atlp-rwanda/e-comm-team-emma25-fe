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
import Profile from "./SellerProfile";
import { useNavigate } from "react-router-dom";
import Chatting from "./Chatting";
import SellerNotification from "./SellerNotification";

const PAGES = ["Products", "Orders", "Profile", "Chat", "Notifications"];

const Dashboard = () => {
  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    // if (newValue === "Profile") {
    //   navigate("/seller-profile");
    // }
  };

  const handleLogout = () => {
    // code to handle logout
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
  }, []);

  return <Products />;
};

const Orders = () => {
  return <div>Orders</div>;
};

const ProfileContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/seller-profile");
  }, []);

  return <Profile />;
};

export default Dashboard;
