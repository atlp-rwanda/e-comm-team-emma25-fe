import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProfileBgroup() {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "absolute", right: "20" }}>
      <ButtonGroup
        color="primary"
        variant="contained"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <Button component={Link} to="/wishlist">
          WishList
        </Button>
        <Button component={Link} to="/user-orders">
          Orders
        </Button>
        <Button
          onClick={() => {
            Cookies.remove("token");
            Cookies.remove("role");
            navigate("/login");
          }}
        >
          LOGOUT
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default ProfileBgroup;
