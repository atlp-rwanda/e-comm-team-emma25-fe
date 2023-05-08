import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../interfaces/functions";
import { AxiosClient } from "../../utils/AxiosClient";
import { toast } from "react-toastify";
import { OrderItem } from "../../interfaces/order";
import AdminOrder from "../../components/AdminOrder";

function AdminOrders() {
  const [orders, setorders] = useState<OrderItem[]>([]);
  const token: string | undefined = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      AxiosClient.get("/orders/getAll", {
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
    <div>
      <div className="backOrder">
        <div className="secondoption">
          <Typography
            component="div"
            variant="h3"
            color="primary"
            sx={{ marginTop: "20px", fontWeight: 600, textAlign: "center" }}
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
              <AdminOrder
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
    </div>
  );
}

export default AdminOrders;
