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
  address: string;
  city: string;
  stateOrProvince: string;
  zipOrPostalCode: string;
  country: string;
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
    <div>
      <h1>Profile</h1>
      {sellerData ? (
        <div>
          <p>
            Name: {sellerData.firstName} {sellerData.lastName}
          </p>
          <p>Email: {sellerData.email}</p>
          <p>Phone number: {sellerData.phoneNumber}</p>
          <p>Gender: {sellerData.gender}</p>
          <p>Birthdate: {sellerData.birthdate}</p>
          <p>Language: {sellerData.language}</p>
          <p>Address: {sellerData.address}</p>
          <p>City: {sellerData.city}</p>
          <p>State/Province: {sellerData.stateOrProvince}</p>
          <p>Zip/Postal Code: {sellerData.zipOrPostalCode}</p>
          <p>Country: {sellerData.country}</p>
          <Link to="/edit-seller-profile">Edit Profile</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SellerProfile;
