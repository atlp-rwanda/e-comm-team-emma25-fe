import React from "react";
// import { Input } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@mui/material/Typography";
import "../assets/styles/navbar.css";
import Cookies from "js-cookie";
import SearchBar from "./SearchProduct";
import { Link, useNavigate } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

function NavbarTop() {
  const navigate = useNavigate()
  function getCookie(name: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const gettoken: string | undefined = Cookies.get(name);
    return gettoken;
  }
  const token = getCookie("token");
  function Logout(){
    Cookies.remove('token')
    navigate('/login')
    }
  return (
    <div>
      <AppBar position="sticky" color="secondary">
        <StyledToolbar>
          <Typography variant="h6">
            <Link to="/" className="linkers">
              !SHOP
            </Link>
          </Typography>
          <SearchBar />
          <Stack direction="row" gap="20px">
            <IconButton aria-label="cart" component={Link} to="/cart">
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon color="primary" />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="notification"
              component={Link}
              to="/notifications"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon color="primary" />
              </Badge>
            </IconButton>
            <IconButton aria-label="chat" component={Link} to="/chat">
              <Badge badgeContent={0} color="error">
                <ChatIcon color="primary" />
              </Badge>
            </IconButton>
          </Stack>
          <Stack direction="row" gap="20px">
            <Link to="/profile">
              <Avatar />
            </Link>
            {token ? (
              <Button size="small" variant="text" color="primary" onClick={Logout}>
                Logout
              </Button>
            ) : (
              <ButtonGroup size="small" variant="text" color="primary">
                <Button component={Link} to="/login">
                  login
                </Button>
                <Button component={Link} to="/signup">
                  Register
                </Button>
              </ButtonGroup>
            )}
          </Stack>
        </StyledToolbar>
      </AppBar>
    </div>
  );
}

export default NavbarTop;
