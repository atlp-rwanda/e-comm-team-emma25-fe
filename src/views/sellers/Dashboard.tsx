import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import Navigation from "../../components/Navigation";

const dashboard = () => {
  document.title = "Seller's Dashboard || !SHOP";
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Typography paragraph>Dashboard</Typography>
        </Box>
      </Box>
    </>
  );
};

export default dashboard;
