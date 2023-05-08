import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Order from "../components/Order";
import { OrderItem } from "../interfaces/order";
import { AxiosClient } from "../utils/AxiosClient";
import { getCookie } from "../interfaces/functions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import "../assets/styles/order.css";

function Orders() {
  const [orders, setorders] = useState<OrderItem[]>([]);
  const token: string | undefined = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      AxiosClient.get("/orders/userorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setorders(response.data.orders);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast.error(error.response.data.message);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="backOrder">
      <Navbar iconNumber={5} />
      <div className="secondoption">
        <Typography
          component="div"
          variant="h3"
          color="primary"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Orders
        </Typography>
      </div>
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "10px auto",
          padding: "10px",
          boxShadow: "0 7px 10px 1px rgba(0, 0, 0, 0.3)",
          background: "#ffff",
        }}
      >
        {orders.map((order) => {
          return (
            <Order
              key={order.Orderid}
              Orderid={order.Orderid}
              expectedDeliveryDate={order.expectedDeliveryDate}
              amountPaid={order.amountPaid}
              userId={order.userId}
              paymentid={order.paymentid}
              status={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
              orderProducts={order.orderProducts}
            />
          );
        })}
      </Box>
      <Box className="bottomdiv"></Box>
    </div>
  );
}

export default Orders;
