import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
};

function AdminDashboard() {
  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              !SHOP
            </Link>
          </Typography>
          <Button
            sx={{ marginLeft: "auto", color: "primary" }}
            variant="contained"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AdminDashboard;
