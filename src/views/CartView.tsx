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

const CartView = () => {
  const [cartList, setCartList] = useState<
    {
      image: string;
      productName: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    const token = Cookies.get("token");
    AxiosClient.get("/cart/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // setCartList(response.data)
        const list: {
          image: string;
          productName: string;
          price: number;
          quantity: number;
        }[] = [];
        response.data.cart.CartItems.forEach((item) => {
          list.push({
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
    <div>
      <Navbar iconNumber={3} />
      {cartList.map((cart, index) => {
        return (
          <CartCard
            key={index}
            image={cart.image}
            productName={cart.productName}
            quantity={cart.quantity}
            price={cart.price}
          />
        );
      })}
    </div>
  );
};

export default CartView;
