import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Notifications, Message } from "@mui/icons-material";
const PAGES = [
  "Products",
  "Orders",
  "Profile",
  "Chat",
  "Notifications",
  "LOGOUT",
];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handlePageClick = (page) => {
    setOpenDrawer(false);
    if (page === "LOGOUT") {
      // Perform logout action
    } else if (page === "Profile") {
      navigate("/seller-profile");
    } else {
      // Navigate to other pages
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      navigate(`/seller-home/${page.toLowerCase()}`);
    }
  };

  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: {
            background: "#1A2138",
          },
        }}
      >
        <List>
          {PAGES.map((page, index) => (
            <ListItemButton
              onClick={() => handlePageClick(page)}
              key={index}
              sx={{ color: "white" }}
            >
              <ListItemIcon>
                {/* Render appropriate icon based on page */}
                {page === "Products" && (
                  <DashboardIcon sx={{ color: "white" }} />
                )}
                {page === "Orders" && (
                  <ShoppingCartIcon sx={{ color: "white" }} />
                )}
                {page === "Notifications" && (
                  <Notifications sx={{ color: "white" }} />
                )}
                {page === "Chat" && <Message sx={{ color: "white" }} />}
                {page === "Profile" && <PersonIcon sx={{ color: "white" }} />}
                {page === "LOGOUT" && <ExitToAppIcon sx={{ color: "white" }} />}
              </ListItemIcon>
              <ListItemText primary={page} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{
          color: "white",
          marginLeft: "auto",
          "&:hover": {
            color: "#FFB822",
          },
        }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
