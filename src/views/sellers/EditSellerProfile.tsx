/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  ProfileDetails,
  BillingAddress,
  Address,
  FormValues,
} from "../../interfaces/SellerProfile";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AxiosClient } from "../../utils/AxiosClient";

const EditSellerProfile = () => {
  const [inAction, setAction] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    // getValues,
  } = useForm<FormValues>();

  const [initialValues, setInitialValues] = useState<FormValues>();

  useEffect(() => {
    const fetchData = async () => {
      const userId = 715;
      const response = await AxiosClient.get(`/profile/${userId}`);
      const sellerData = response.data.data;
      console.log("sellerData", sellerData);

      const initialValues: FormValues = {
        firstName: sellerData.firstName,
        lastName: sellerData.lastName,
        email: sellerData.email,
        phoneNumber: sellerData.phoneNumber,
        gender: sellerData.gender,
        birthdate: sellerData.birthdate,
        language: sellerData.language,
        streetAddress: sellerData.Address.streetAddress,
        city: sellerData.Address.city,
        stateOrProvince: sellerData.Address.stateOrProvince,
        zipOrPostalCode: sellerData.Address.zipOrPostalCode,
        country: sellerData.Address.country,
        billingStreetAddress: sellerData.billingAddress.streetAddress,
        billingCity: sellerData.billingAddress.city,
        billingStateOrProvince: sellerData.billingAddress.stateOrProvince,
        billingZipOrPostalCode: sellerData.billingAddress.zipOrPostalCode,
        billingCountry: sellerData.billingAddress.country,
      };
      setInitialValues(initialValues);
      setValue("firstName", initialValues.firstName);
      setValue("lastName", initialValues.lastName);
      setValue("email", initialValues.email);
      setValue("phoneNumber", initialValues.phoneNumber);
      setValue("gender", initialValues.gender);
      setValue("birthdate", initialValues.birthdate);
      setValue("language", initialValues.language);
      setValue("streetAddress", initialValues.streetAddress);
      setValue("city", initialValues.city);
      setValue("stateOrProvince", initialValues.stateOrProvince);
      setValue("zipOrPostalCode", initialValues.zipOrPostalCode);
      setValue("country", initialValues.country);
      setValue("billingStreetAddress", initialValues.billingStreetAddress);
      setValue("billingCity", initialValues.billingCity);
      setValue("billingStateOrProvince", initialValues.billingStateOrProvince);
      setValue("billingZipOrPostalCode", initialValues.billingZipOrPostalCode);
      setValue("billingCountry", initialValues.billingCountry);
    };
    fetchData();
  }, []);

  const submit = (data) => {
    setAction(true);
    toast.loading("Updating profile");

    const billingAddress: BillingAddress = {
      streetAddress: data.billingStreetAddress,
      city: data.billingCity,
      stateOrProvince: data.billingStateOrProvince,
      zipOrPostalCode: data.billingZipOrPostalCode,
      country: data.billingCountry,
    };

    const address: Address = {
      streetAddress: data.streetAddress,
      city: data.city,
      stateOrProvince: data.stateOrProvince,
      zipOrPostalCode: data.zipOrPostalCode,
      country: data.country,
    };

    const profileDetails: ProfileDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      birthdate: data.birthdate,
      language: data.language,
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE1LCJlbWFpbCI6InNlbGxlckBnbWFpbC5jb20iLCJuYW1lIjoiU2VsbGVyIFRvU2VsbCIsInBob25lIjpudWxsLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjgyMjA1MjQxLCJleHAiOjE2ODI4MTAwNDF9.UcMy782TNhfBsbFzLv2LmGav_cwGGbHK6bSRJyq43PE";

    AxiosClient.patch(
      `/profile/edit`,
      {
        profileDetails,
        billingAddress,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

      .then((response) => {
        toast.remove();
        toast.success(response.data.message as string, { duration: 5000 });
        navigate("/seller-profile");
      })
      .catch((error) => {
        setAction(false);
        toast.remove();
        toast.error(error.response.data.message as string, { duration: 5000 });
      });
  };

  return (
    <>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, mx: "auto", maxWidth: 600 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<ChevronLeft />}
                component={Link}
                to="/seller-home"
              >
                Back Home
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1">
                Edit your profile
              </Typography>
            </Grid>
            {initialValues && (
              <Grid item xs={12}>
                <form onSubmit={handleSubmit(submit)}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("firstName") || initialValues.firstName || null
                    }
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? "First Name can't be empty" : ""
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialValues.lastName || ""}
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? "Last Name is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Email address"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialValues.email || ""}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email ? "Email is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialValues.phoneNumber || ""}
                    {...register("phoneNumber")}
                    error={!!errors.phoneNumber}
                    helperText={
                      errors.phoneNumber ? "Phone number is required" : ""
                    }
                    disabled={inAction}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+250</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Gender"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialValues.gender || ""}
                    {...register("gender")}
                    error={!!errors.gender}
                    helperText={errors.gender ? "Gender is required" : ""}
                    disabled={inAction}
                    select
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    label="Birthdate"
                    variant="outlined"
                    margin="normal"
                    {...register("birthdate")}
                    defaultValue={initialValues?.birthdate}
                    error={!!errors.birthdate}
                    helperText={errors.birthdate ? "Birthdate is required" : ""}
                    disabled={inAction}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Street Address"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("streetAddress") ||
                      initialValues.streetAddress ||
                      null
                    }
                    {...register("streetAddress")}
                    error={!!errors.streetAddress}
                    helperText={
                      errors.streetAddress ? "Street Address is required" : ""
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    margin="normal"
                    value={watch("city") || initialValues.city || null}
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city ? "City is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="State/Province"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("stateOrProvince") ||
                      initialValues.stateOrProvince ||
                      null
                    }
                    {...register("stateOrProvince")}
                    error={!!errors.stateOrProvince}
                    helperText={
                      errors.stateOrProvince && "State/province is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Zip/Postal Code"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("zipOrPostalCode") ||
                      initialValues.zipOrPostalCode ||
                      null
                    }
                    {...register("zipOrPostalCode")}
                    error={!!errors.zipOrPostalCode}
                    helperText={
                      errors.zipOrPostalCode && "Zip/postal code is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Country"
                    variant="outlined"
                    margin="normal"
                    value={watch("country") || initialValues.country || null}
                    {...register("country")}
                    error={!!errors.country}
                    helperText={errors.country && "Country is required"}
                    disabled={inAction}
                  />
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Billing Address
                    </Typography>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Billing Street Address"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("billingStreetAddress") ||
                      initialValues.billingStreetAddress ||
                      null
                    }
                    {...register("billingStreetAddress")}
                    error={!!errors.billingStreetAddress}
                    helperText={
                      errors.billingStreetAddress &&
                      "Billing street address is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Billing City"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("billingCity") || initialValues.billingCity || null
                    }
                    {...register("billingCity")}
                    error={!!errors.billingCity}
                    helperText={
                      errors.billingCity && "Billing city is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Billing State/Province"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("billingStateOrProvince") ||
                      initialValues.billingStateOrProvince ||
                      null
                    }
                    {...register("billingStateOrProvince")}
                    error={!!errors.billingStateOrProvince}
                    helperText={
                      errors.billingStateOrProvince &&
                      "Billing state/province is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Billing Zip/Postal Code"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("billingZipOrPostalCode") ||
                      initialValues.billingZipOrPostalCode ||
                      null
                    }
                    {...register("billingZipOrPostalCode")}
                    error={!!errors.billingZipOrPostalCode}
                    helperText={
                      errors.billingZipOrPostalCode &&
                      "Billing zip/postal code is required"
                    }
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Billing Country"
                    variant="outlined"
                    margin="normal"
                    value={
                      watch("billingCountry") ||
                      initialValues.billingCountry ||
                      null
                    }
                    {...register("billingCountry")}
                    error={!!errors.billingCountry}
                    helperText={
                      errors.billingCountry && "Billing country is required"
                    }
                    disabled={inAction}
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={inAction}
                      startIcon={<Save />}
                    >
                      {inAction ? "Submitting..." : "Save Changes"}
                    </Button>
                  </Box>
                </form>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditSellerProfile;
