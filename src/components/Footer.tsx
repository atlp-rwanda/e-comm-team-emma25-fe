import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  const iconStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#555",
    margin: "0 8px",
    transition: "all 0.3s ease-in-out",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    "&:hover": {
      backgroundColor: "#3B5998",
      color: "#fff",
    },
  };

  return (
    <Box component="footer" sx={{ bgcolor: "#F2F2F2" }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Connect with us
            </Typography>
            <Grid container justifyContent="flex-start">
              <Box component="a" href="#" sx={iconStyle}>
                <FacebookIcon />
              </Box>
              <Box component="a" href="#" sx={iconStyle}>
                <TwitterIcon />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              About us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are a team of experienced developers building amazing products
              for our clients.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Email: contact@ecommerce.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Phone: +250 788 000 000
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Links
            </Typography>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 1 }}>
                <Link href="#" color="textPrimary" variant="body2">
                  Licence
                </Link>
              </li>
              <li style={{ marginBottom: 1 }}>
                <Link href="#" color="textPrimary" variant="body2">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, textAlign: "center" }}>
          {"© "}
          <Link href="" color="textPrimary">
            E-Commerce
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
