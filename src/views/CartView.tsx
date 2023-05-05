/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises*/

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CartCard from "./CartCard";
import { AxiosClient } from "../utils/AxiosClient";
import Cookies from "js-cookie";
import { Button, Typography, Container } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { formatCurrency } from "../utils/formatCurrency";

const CartView = () => {
  const token = Cookies.get("token");
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [cartList, setCartList] = useState<
    {
      id: number;
      image: string;
      productName: string;
      price: number;
      quantity: number;
    }[]
  >([]);
  const handleClearCart = () => {
    setDisabled(true);
    AxiosClient.delete("/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.data.statusCode == 200) {
          setDisabled(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  useEffect(() => {
    AxiosClient.get("/cart/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // setCartList(response.data)
        setTotal(response.data.cart.Total);
        const list: {
          id: number;
          image: string;
          productName: string;
          price: number;
          quantity: number;
        }[] = [];
        response.data.cart.CartItems.forEach((item) => {
          list.push({
            id: item.id,
            image: item.image,
            productName: item.ProductName,
            price: item.price,
            quantity: item.quantity,
          });
          setCartList(list);
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <>
      <Navbar iconNumber={3} />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {cartList.map((cart, index) => {
          return (
            <CartCard
              key={index}
              image={cart.image}
              productName={cart.productName}
              quantity={cart.quantity}
              price={cart.price}
              id={cart.id}
            />
          );
        })}
        <div
          style={{
            padding: "25px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClearCart}
            disabled={disabled}
            startIcon={<DeleteForever />}
            color="error"
          >
            Clear Cart
          </Button>
          <Typography sx={{ fontWeight: 700 }}>
            {formatCurrency(total)}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default CartView;
