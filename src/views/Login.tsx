/* eslint-disable @typescript-eslint/no-misused-promises*/

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Theme from "../public/themes/theme";
import { AxiosClient } from "../utils/AxiosClient";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
const theme = Theme;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);
  const tsver = Boolean(Cookies.get("tsver"));
  const onSubmit = handleSubmit((data) => {
    toast.loading("Please wait ....");
    setLoading(true);
    AxiosClient.post("/login", {
      email: data.email as string,
      password: data.password as string,
    })
      .then((response) => {
        toast.remove();
        toast.success(response.data.message as string);
        const token = response.data.token as string;
        const userId = response.data.userId as string; // retrieve userId from response
        const role = response.data.role as string; // retrieve role from response
        localStorage.setItem("userId", userId); // store userId in localStorage
        localStorage.setItem("role", role); // store role in localStorage
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        Cookies.set("token", token);
        localStorage.setItem("phnbr", response.data.phone as string);
        Cookies.set("role", response.data.role as string);
        if (response.data.role == "seller") {
          if (tsver) {
            window.location.href = "/seller-home";
          } else {
            window.location.href = "/verify-code";
          }
        } else if (
          response.data.role == "user" ||
          response.data.role == "buyer"
        ) {
          window.location.href = "/";
        } else {
          window.location.href = "/admin-dashboard";
        }
      })
      .catch((error) => {
        toast.remove();
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.message as string);
      });
  });

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
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              paddingTop: 6,
              paddingLeft: 5,
              paddingRight: 5,
            },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              margin: "50px auto",
              maxWidth: 450,
              flexGrow: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Link href="/" variant="body2">
              Home
            </Link>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                {...register("email", { required: true })}
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="off"
                error={!!errors.email}
                helperText={errors.email ? "Email is required" : ""}
              />
              <TextField
                {...register("password", { required: true })}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                error={!!errors.password}
                helperText={errors.password ? "Password is required" : ""}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Toaster />
    </ThemeProvider>
  );
}
