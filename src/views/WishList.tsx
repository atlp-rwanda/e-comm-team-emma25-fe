import React from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/bottomNav.css";
import { Typography } from "@mui/material";
import Wishlistcard from "../components/wishlist/wishlistcard";
import Box from "@mui/material/Box";

function WishList() {
  return (
    <div>
      <Navbar iconNumber={5} />
      <div className="secondoption">
        <Typography
          component="div"
          variant="h3"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Wishlist
        </Typography>
      </div>
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "10px auto",
        }}
      >
        <Wishlistcard
          id={1}
          productId="mhvdtyh"
          name="lamborgin"
          description="expensive car"
          price={2000000}
          image="https://yourtestdriver.com/wp-content/uploads/2022/06/2a2d0c89-aa71-41b9-b376-2f3f8f330bcf-1536x1152.jpg"
        />
        <Wishlistcard
          id={3}
          productId="mhvdtyh"
          name="lamborgin"
          description="expensive car"
          price={2000000}
          image="https://yourtestdriver.com/wp-content/uploads/2022/06/2a2d0c89-aa71-41b9-b376-2f3f8f330bcf-1536x1152.jpg"
        />
      </Box>
    </div>
  );
}

export default WishList;
