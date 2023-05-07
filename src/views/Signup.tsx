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
import Theme from "../public/themes/theme";
import { AxiosClient } from "../utils/AxiosClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
// notifications import
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = Theme;

export default function SignUp() {
  type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    password: string;
  };
  // sign up form states
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

  const navigate = useNavigate();

  // notifications states
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  type AlertColor = "success" | "info" | "warning" | "error";
  const [severityType, setSeverityType] = useState<AlertColor>("warning");
  const [loading, setLoading] = React.useState(false);

  // <MyAlert severity="error" message="This is an error message!" />

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    AxiosClient.post("/signup", formData)
      .then((response) => {
        // Handle successful response
        const notificationMessage = `Welcome ${formData.firstName} ${formData.lastName} You successfully registered`;
        setSeverityType("success");
        setOpen(true);
        setMessage(notificationMessage);
        console.log(response);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          token as string
        }`;
        // document.cookie = `token=${token}`;
        Cookies.set("token", token as string);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.data.error) {
          const notificationMessage: string = error.response.data
            .error as string;
          // that falls out of the range of 2xx
          setSeverityType("warning");
          setOpen(true);
          setMessage(notificationMessage);
        } else if (error.response.data.message) {
          const notificationMessage: string = error.response.data
            .message as string;
          // user exist
          setSeverityType("warning");
          setOpen(true);
          setMessage(notificationMessage);
        } else {
          const notificationMessage = "Network Error, Try Again";
          setSeverityType("warning");
          setOpen(true);
          setMessage(notificationMessage);
        }
      });
  };
  return (
    <>
      <Navbar iconNumber={2} />
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
                disabled={loading}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severityType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
