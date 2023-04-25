import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosClient } from "../../utils/AxiosClient";

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#E5E5CB",
        width: "100%",
        padding: "2rem",
        borderRadius: "10px",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <Link
        to="/seller-home"
        style={{
          alignSelf: "flex-start",
          marginBottom: "2rem",
          color: "#1B1F23",
          fontWeight: "bold",
        }}
      >
        Back to Home
      </Link>
      <h1
        style={{
          marginBottom: "1.5rem",
          color: "#1B1F23",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Profile
      </h1>
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
            Physical Address:
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
              {sellerData.Address.city}
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
  );
};

export default SellerProfile;
