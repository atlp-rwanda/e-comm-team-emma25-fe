/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosClient } from "../../utils/AxiosClient";
import { Typography, Avatar, Box } from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PersonIcon from "@mui/icons-material/Person";
type SellerData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthdate: string;
  language: string;
  Address: {
    id: number | string;
    country: string;
    city: string;
    stateOrProvince: string;
    streetAddress: string;
    zipOrPostalCode: number | string;
  };
  billingAddress: {
    city: string;
    streetAddress: string;
  };
};

const ProfileComp: React.FC = () => {
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const userId = localStorage.getItem("userId");
  console.log("the userId", userId);
  console.log(`/profile/${userId}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosClient.get(`/profile/${userId}`);
        console.log("response", response);
        if (response.data.statusCode === 200) {
          setSellerData(response.data.data as SellerData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [userId]);

  console.log("user data", sellerData);

  const role = localStorage.getItem("role");

  const renderAvatar = () => {
    if (role === "admin") {
      return (
        <Avatar
          sx={{
            bgcolor: "#1A120B",
            color: "#fff",
            width: "48px",
            height: "48px",
          }}
        >
          <AdminPanelSettingsRoundedIcon />
        </Avatar>
      );
    } else {
      return (
        <Avatar
          sx={{
            bgcolor: "#1A120B",
            color: "#fff",
            width: "48px",
            height: "48px",
          }}
        >
          <PersonIcon />
        </Avatar>
      );
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E5E5CB",
          width: "100%",
          height: "100vh",
          padding: "2rem",
          borderRadius: "10px",
          fontFamily: "Lato, sans-serif",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1A120B",
            color: "#fff",
            width: "120px",
            height: "48px",
            borderRadius: "4px",
            mb: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ mr: 1, textTransform: "capitalize" }}
          >
            {role}
          </Typography>

          {role && renderAvatar()}
        </Box>
        {sellerData ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(27, 31, 35, 0.04)",
            }}
          >
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Name:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData.firstName} {sellerData.lastName}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Email:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData.email}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Phone number:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData?.phoneNumber}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Gender:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData?.gender}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Birthdate:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {/* {sellerData?.birthdate.split("T")[0]} */}
                {sellerData?.birthdate
                  ? sellerData.birthdate.split("T")[0]
                  : ""}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Language:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData.language}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              City:
              <span
                style={{
                  marginLeft: "0 .5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData.billingAddress?.city}
              </span>
            </p>
            <p
              style={{
                marginBottom: "1rem",
                color: "#586069",
                fontWeight: "bold",
              }}
            >
              Country:
              <span
                style={{
                  marginLeft: "0.5rem",
                  color: "#24292E",
                  fontWeight: "normal",
                }}
              >
                {sellerData.Address?.country}
              </span>
            </p>
            <Link
              to={"/edit-profile"}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#1B1F23",
                color: "#FFFFFF",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Link>
          </div>
        ) : (
          <p style={{ color: "#1A120B", textAlign: "center" }}>
            loading profile data...
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileComp;
