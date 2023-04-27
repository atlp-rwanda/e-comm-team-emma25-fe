import React from "react";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Chatscreen from "../../components/Chatcomponents/chatmessage";

const Chatting = () => {
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Button
        variant="outlined"
        component={Link}
        to="/seller-home"
        sx={{ marginLeft: "25px", marginTop: "-10px" }}
        color="info"
        startIcon={<ChevronLeft />}
      >
        Home
      </Button>
      <Chatscreen />
    </Container>
  );
};

export default Chatting;
