import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosClient } from "../../utils/AxiosClient";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "../../components/DrawerComp";

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

const SellerProfile: React.FC = () => {
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const userId = 715;
  useEffect(() => {
    AxiosClient.get(`/profile/${userId}`).then((response) =>
      setSellerData(response.data.data as SellerData)
    );
  }, []);
  console.log(sellerData);

  const PAGES = ["Products", "Orders", "Profile"];

  const [value, setValue] = useState<string>(PAGES[0]);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case "Products":
        navigate("/seller-home");
        break;
      case "Profile":
        navigate("/seller-profile");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <>
      <AppBar color="primary">
        <Toolbar>
          <Typography sx={{ fontSize: "1.5rem", paddingLeft: "2px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              !SHOP
            </Link>
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto", "& .MuiTabs-indicator": {} }}
                textColor="inherit"
                value={value}
                onChange={handleChange}
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} value={page} />
                ))}
              </Tabs>
              <Button
                sx={{ marginLeft: "auto", color: "primary" }}
                variant="contained"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
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
                {sellerData.phoneNumber}
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
                {sellerData.gender}
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
                {sellerData.birthdate}
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
                {sellerData.billingAddress.city}
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
                {sellerData.Address.country}
              </span>
            </p>
            <Link
              to="/edit-seller-profile"
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

export default SellerProfile;
