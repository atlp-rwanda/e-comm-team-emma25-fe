import React from "react";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Notification from "../../components/Notification";

const SellerNotification = () => {
  return (
    <Container maxWidth="md" sx={{ p: 3 }}>
      <Button
        variant="outlined"
        component={Link}
        to="/seller-home"
        sx={{ marginLeft: "25px", marginTop: "-10px", marginBottom: "30px" }}
        color="info"
        startIcon={<ChevronLeft />}
      >
        Home
      </Button>
      <Notification />
    </Container>
  );
};

export default SellerNotification;
