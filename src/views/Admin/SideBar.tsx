import React, { useState } from "react";
import "./SideBar.scss";
import RolePermission from "./rolePermission";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AdminOrders from "./AdminOrders";
import Cookies from "js-cookie";
import Chatting from "../sellers/Chatting";
import SellerNotification from "../sellers/SellerNotification";
const PAGES = ["Users", "Orders", "Profile", "Chat", "Notifications"];
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import AdminProfile from "./AdminProfile";
import { getCookie } from "../../interfaces/functions";

const SideBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const token: string | undefined = getCookie("token");
  if (token) {
    const role: string | undefined = getCookie("role");
    if (role) {
      if (role !== "admin") {
        Cookies.remove("token");
        Cookies.remove("role");
        window.location.href = "/login";
      }
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            !SHOP ADMIN
          </Typography>
          {isMatch ? (
            <>
              <Box sx={{ position: "absolute", right: "5px", top: "5px" }}>
                <IconButton
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ float: "right" }}
                >
                  <MenuIcon color="secondary" />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {PAGES.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setValue(PAGES[index]);
                        handleClose();
                      }}
                    >
                      <Tab label={page} value={page} />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
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
      {value === "Users" && <RolePermission />}
      {value === "Orders" && <AdminOrders />}
      {value === "Profile" && <AdminProfile />}
      {value == "Chat" && <Chatting />}
      {value == "Notifications" && <SellerNotification />}
    </React.Fragment>
  );
};

export default SideBar;
