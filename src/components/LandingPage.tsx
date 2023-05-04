import * as React from "react";
import ProductHeroLayout from "./ProductLayout";
import { Button, Typography } from "@mui/material";

const backgroundImage =
  "https://images.unsplash.com/photo-1567016546367-c27a0d56712e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

export default function LandingPage() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
        minHeight: "92vh", // Set the height
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          marginRight: "60%",
        }}
      >
        <Typography
          color="inherit"
          align="left"
          variant="h3"
          fontFamily="Frank Ruhl Libre"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
          Transform Your Space,
          <br />
          One Piece At a Time
        </Typography>
        <Typography
          variant="body2"
          color="inherit"
          sx={{ mb: 2, fontSize: "1.1rem" }}
        >
          Discover the full experience of turning your home into a sanctuary
          with our carefully curated collection of our products.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          component="a"
          href="#"
          sx={{
            borderRadius: 20,
            marginTop: 4,
            padding: "15px 50px",
          }}
        >
          SHOW NOW
        </Button>
      </div>
    </ProductHeroLayout>
  );
}
