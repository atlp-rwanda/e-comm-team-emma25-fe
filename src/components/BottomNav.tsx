import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface propstype {
  iconNumber: number;
}
function BottomNav(props: propstype) {
  return (
    <BottomNavigation
      value={props.iconNumber - 1}
      color="primary"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <BottomNavigationAction
        label={<Typography variant="body1">Home</Typography>}
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        label={<Typography variant="body1">Chat</Typography>}
        icon={<ChatIcon />}
        href="/chat"
      />
      <BottomNavigationAction
        label={<Typography variant="body1">Cart</Typography>}
        icon={<ShoppingCartIcon />}
        component={Link}
        to="/cart"
      />
      <BottomNavigationAction
        label={<Typography variant="body1">Notifications</Typography>}
        icon={<NotificationsIcon />}
        component={Link}
        to="/notifications"
      />
      <BottomNavigationAction
        label={<Typography variant="body1">profile</Typography>}
        icon={<PersonIcon />}
        component={Link}
        to="/profile"
      />
    </BottomNavigation>
  );
}

export default BottomNav;
