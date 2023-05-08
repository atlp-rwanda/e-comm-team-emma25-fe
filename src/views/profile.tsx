import React from "react";
import Navbar from "../components/Navbar";
import ProfileBgroup from "../components/ProfileBgroup";
import ProfileComp from "./Profile/profilecomponetn";
import { Box } from "@mui/material";

function Profile() {
  return (
    <div>
      <Navbar iconNumber={5} />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <ProfileComp />
        <ProfileBgroup />
      </Box>
    </div>
  );
}

export default Profile;
