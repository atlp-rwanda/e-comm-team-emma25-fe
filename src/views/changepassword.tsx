/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises*/

import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Theme from "../public/themes/theme";
// import { FormEvent } from 'react';
import { AxiosClient } from "../utils/AxiosClient";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const theme = Theme;

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  if (!email) {
    navigate("/reset-password");
  }
  const onSubmit = handleSubmit((data) => {
    toast.loading("Sending you a token...");
    setLoading(true);
    AxiosClient.patch(`/changepassword/${email}/${data.token}`, {
      newpassword: data.newpassword,
      confirmpass: data.confirmpassword,
    })
      .then((response) => {
        toast.remove();
        toast.success(response.data.message);
        if (response.data.statusCode === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.remove();
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.message);
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
              Reset Password
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                {...register("token", { required: true })}
                margin="normal"
                fullWidth
                label="Token"
                autoComplete="off"
                error={!!errors.token}
                helperText={errors.token ? "Token is required" : ""}
              />

              <TextField
                {...register("newpassword", { required: true })}
                margin="normal"
                fullWidth
                label="New Password "
                autoComplete="off"
                //   autoFocus
                error={!!errors.newpassword}
                helperText={errors.newpassword ? "NewPassword is required" : ""}
              />
              <TextField
                {...register("confirmpassword", { required: true })}
                margin="normal"
                fullWidth
                label="ConfirmPassword"
                autoComplete="off"
                error={!!errors.confirmpassword}
                helperText={
                  errors.confirmpassword ? "ConfirmPassword is required" : ""
                }
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Comfirm
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2"></Link>
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
