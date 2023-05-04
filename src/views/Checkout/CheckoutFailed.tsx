import React from "react";
import Navbar from "../../components/Navbar";
import { Typography } from "@mui/material";

function CheckoutFailed() {
  return (
    <div>
      <Navbar iconNumber={1} />
      <Typography
        component="div"
        variant="h3"
        color="primary"
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        Checkout Failed
      </Typography>
    </div>
  );
}

export default CheckoutFailed;
