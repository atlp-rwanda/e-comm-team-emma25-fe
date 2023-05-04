/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Notification from "./Notification";
import {
  Box,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

function NavbarTop() {
  const navigate = useNavigate();
  function getCookie(name: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const gettoken: string | undefined = Cookies.get(name);
    return gettoken;
  }
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = getCookie("token");
  function Logout() {
    Cookies.remove("token");
    navigate("/");
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
            <Tooltip title="Notifications">
              <IconButton aria-label="notification" onClick={handleClickOpen}>
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon color="primary" />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton aria-label="chat" href="/chat">
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
              <Button
                size="small"
                variant="text"
                color="primary"
                onClick={Logout}
              >
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Notifications"}
          </DialogTitle>
          <CloseRounded
            sx={{ mr: 5, cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <Notification />
        </DialogContent>
        <Divider />
        <Typography
          gutterBottom
          sx={{ ml: 3, textDecoration: "none" }}
          component={Link}
          to="/notifications"
          color="info"
        >
          View all notifications
        </Typography>
      </Dialog>
    </div>
  );
}

export default NavbarTop;
