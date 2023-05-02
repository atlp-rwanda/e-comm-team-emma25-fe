import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../themes/theme";
import { AxiosClient } from "../utils/AxiosClient";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// notifications import
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";

const theme = Theme;

export default function RoleUpdate() {
  type UpdatedRole = {
    email: string;
    role: string;
  };
  // sign up form states
  const [formData, setFormData] = useState<UpdatedRole>({
    email: "",
    role: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
    // get token from cookies
    const token = Cookies.get("token") as string;
    console.log(`token is ${token}`);
    if (token) {
      AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    AxiosClient.patch("/authorize", formData, {})
      .then((response) => {
        // Handle successful response
        const notificationMessage = `SUCCESS: User with ${formData.email} is now ${formData.role}`;
        setSeverityType("success");
        setOpen(true);
        setMessage(notificationMessage);
        console.log(response);
        setFormData({
          email: "",
          role: "",
        });
        setLoading(false);
        <Navigate to="/" />;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.data.message) {
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
            <Typography component="h1" variant="h4" color="primary">
              ADMIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={formData.email}
                    onChange={handleInput}
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="User Email To Update"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={formData.role}
                    onChange={handleInput}
                    required
                    fullWidth
                    id="role"
                    label="Role (user,admin,seller)"
                    name="role"
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
                UPDATE ROLE
              </Button>
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
