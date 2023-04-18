import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)({
  backgroundColor: "#1A120B",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#3C2A21",
  },
});

function Profile() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/seller-home");
  };

  return (
    <>
      <StyledButton variant="contained" onClick={handleNavigate}>
        Go to Dashboard
      </StyledButton>
    </>
  );
}

export default Profile;
