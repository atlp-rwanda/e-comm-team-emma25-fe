/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SellerProfile, FormValues } from "../../interfaces/SellerProfile";
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
  // IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AxiosClient } from "../../utils/AxiosClient";

const EditSellerProfile = () => {
  const [inAction, setAction] = useState(false);
  const navigate = useNavigate();
  const submit = (data) => {
    setAction(true);
    toast.loading("Updating profile");

    const sellerProfile: SellerProfile = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      createdAt: "",
      updatedAt: "",
      language: undefined,
      city: undefined,
      stateOrProvince: undefined,
      zipOrPostalCode: undefined,
      country: undefined,
      birthdate: undefined,
      gender: undefined,
      lastName: undefined,
      firstName: undefined
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE1LCJlbWFpbCI6InNlbGxlckBnbWFpbC5jb20iLCJuYW1lIjoiU2VsbGVyIFRvU2VsbCIsInBob25lIjpudWxsLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjgyMTMwMDk3LCJleHAiOjE2ODI3MzQ4OTd9.S8HtMX50n6Qmgy5N_iq4dXrdOUgBDe7wZKLzuWED72g";

    AxiosClient.patch(`/profile/edit`, sellerProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.remove();
        toast.success(response.data.message as string, { duration: 5000 });
        setTimeout(() => {
          navigate("/seller-profile");
        }, 4000);
      })
      .catch((error) => {
        toast.remove();
        toast.error(error?.response.data.message as string, {
          duration: 10000,
        });
      })
      .finally(() => {
        setAction(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

const [initialValues, setInitialValues] = useState<FormValues>();

useEffect(() => {
  const fetchData = async () => {
    const userId = 715;
    const response = await AxiosClient.get(`/profile/${userId}`);
    const sellerData = response.data.data;

    console.log('sellerData', sellerData)
    
    const initialValues: FormValues = {
      firstName: sellerData.firstName,
      lastName: sellerData.lastName,
      email: sellerData.email,
      phoneNumber: sellerData.phoneNumber,
      gender: sellerData.gender,
      birthdate: sellerData.birthdate,
      language: sellerData.language,
      streetAddress: sellerData.address,
      city: sellerData.city,
      stateOrProvince: sellerData.stateOrProvince,
      zipOrPostalCode: sellerData.zipOrPostalCode,
      country: sellerData.country,
    };

    setInitialValues(initialValues);
  };
  fetchData();
}, []);
  
console.log('initialValues', initialValues)

  return (
    <>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
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
              <Grid item xs={12} sm={6}>
                <form onSubmit={handleSubmit(submit)}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialValues?.firstName || ""}
                    onChange={(e) => {
                      setInitialValues({
                        ...initialValues,
                        firstName: e.target.value,
                      });
                    }}
                    error={!!errors.firstName}
                    helperText={errors.firstName ? "First Name is required" : ""}
                    disabled={inAction}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    {...register("lastName", { required: true })}
                    defaultValue={initialValues?.lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? "Last Name is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Email address"
                    variant="outlined"
                    margin="normal"
                    {...register("email", { required: true })}
                    defaultValue={initialValues?.email}
                    error={!!errors.email}
                    helperText={errors.email ? "Email is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    margin="normal"
                    {...register("phoneNumber", { required: true })}
                    defaultValue={initialValues?.phoneNumber}
                    error={!!errors.phoneNumber}
                    helperText={
                      errors.phoneNumber ? "Phone number is required" : ""
                    }
                    disabled={inAction}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+1</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Gender"
                    variant="outlined"
                    margin="normal"
                    {...register("gender", { required: true })}
                    defaultValue={initialValues?.gender}
                    error={!!errors.gender}
                    helperText={errors.gender ? "Gender is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Birthdate"
                    variant="outlined"
                    margin="normal"
                    {...register("birthdate", { required: true })}
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
                    label="Language"
                    variant="outlined"
                    margin="normal"
                    {...register("language", { required: true })}
                    defaultValue={initialValues?.language}
                    error={!!errors.language}
                    helperText={errors.language ? "Language is required" : ""}
                    disabled={inAction}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    {...register("address", { required: true })}
                    defaultValue={initialValues?.address}
                    error={!!errors.address}
                    helperText={errors.address ? "Address is required" : ""}
                    disabled={inAction}
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={inAction}
                    >
                      Save Changes
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