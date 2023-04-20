import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../themes/theme";
import { AxiosClient } from "../utils/AxiosClient";
import { Navigate } from "react-router-dom";

const theme = Theme;

export default function SignUp() {
  type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    password: string;
  };

  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    AxiosClient.post("/signup", formData)
      .then((response) => {
        // Handle successful response
        alert("successfully registered");
        console.log(response);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone_number: "",
          password: "",
        });
        <Navigate to="/login" />;
      })
      .catch((error) => {
        if (error.response.data.error) {
          // that falls out of the range of 2xx
          console.log(error);
          alert(error.response.data.error);
        } else if (error.response.data.message) {
          // user exist
          console.log(error);
          alert(error.response.data.message);
        } else {
          console.log(error);
          alert("Sorry Try Again");
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">!shop</Typography>
          <Typography component="h1" variant="h4" color="primary">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formData.firstName}
                  onChange={handleInput}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formData.lastName}
                  onChange={handleInput}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formData.email}
                  onChange={handleInput}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formData.phone_number}
                  onChange={handleInput}
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number (eg: 250780....)"
                  name="phone_number"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formData.password}
                  onChange={handleInput}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
