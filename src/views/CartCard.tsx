/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises*/

import React from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";

function CartCard(props) {
  const { image, productName, quantity, price } = props;
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            boxShadow: "0 0 10px 0 rgba(0,0,0,.5)",
            borderRadius: "7px",
            "& > :not(style)": {
              m: 1,
              p: 2,
            },
          }}
        >
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Shopping cart</Typography>
            <Typography color="error" sx={{ textDecoration: "underline" }}>
              Remove all
            </Typography>
          </div>

          <div
            className="body"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <img src={image} alt="cocoCola" style={{ width: 80 }} />
            </Typography>
            <Typography sx={{ fontWeight: "bolder" }}>{productName}</Typography>
            <div>
              <button
                style={{ borderRadius: "7px", width: "20px", height: "20px" }}
              >
                -
              </button>
            </div>
            <Typography>{quantity}</Typography>
            <div>
              <button
                style={{ borderRadius: "7px", width: "20px", height: "20px" }}
              >
                +
              </button>
            </div>
            <Typography>{formatCurrency(price)}</Typography>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default CartCard;
