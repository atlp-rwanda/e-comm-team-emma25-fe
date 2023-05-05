import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";
import { AxiosClient } from "../utils/AxiosClient";
import Cookies from "js-cookie";
import { CartContent } from "../interfaces/Cart";

const QttProps = {
  min: 1,
  autoFocus: true,
};

function CartCard(props: CartContent) {
  const { image, productName, quantity, price, id } = props;
  const [qtt, setQtt] = useState(quantity);
  const [updateItem, setUpdateItem] = useState<CartContent>({
    image: "",
    quantity: 0,
    id: 0,
    productName: "",
    price: 0,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const [disabled, setDisabled] = useState(false);
  const token: string = Cookies.get("token") as string;
  const handleDeleteSingle = (cart_id: number) => {
    setDisabled(true);
    AxiosClient.delete(`/cart/remove/${cart_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode == 200) {
          setDisabled(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setDisabled(false));
  };

  const handleUpdateCart = (cart: CartContent) => {
    openDialog();
    setUpdateItem(cart);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQtt(parseInt(event.target.value));
  };
  const updateQuantity = () => {
    setLoading(true);
    AxiosClient.patch(
      `/cart/${updateItem.id}`,
      { itemQuantity: qtt },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.data.statusCode == 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            boxShadow: "0 0 10px 0 rgba(0,0,0,.5)",
            borderRadius: "7px",
            "& > :not(style)": {
              p: "10px",
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
            <Button
              variant="text"
              disabled={disabled}
              sx={{ textTransform: "capitalize" }}
              color="error"
              onClick={() => handleDeleteSingle(id)}
            >
              Remove
            </Button>
          </div>
          <div
            className="body"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <img
              src={image}
              alt={productName}
              style={{ width: 100, borderRadius: "5px" }}
            />
            <Typography
              sx={{
                fontWeight: "bolder",
                cursor: "pointer",
                "&:hover": { color: "blue" },
              }}
              onClick={() => handleUpdateCart(props)}
            >
              {productName}
            </Typography>
            <Typography>{quantity}</Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {formatCurrency(price)}
            </Typography>
          </div>
          <Divider />
          <Typography sx={{ fontWeight: 600 }}>
            {" "}
            Total: {formatCurrency(price * quantity)}{" "}
          </Typography>
        </Box>
      </Container>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{updateItem.productName}</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Feel free to change the quantity of your product.
          </DialogContentText>
          <TextField
            label="Product Quantity"
            type="number"
            fullWidth
            defaultValue={updateItem.quantity}
            onChange={handleQuantityChange}
            inputProps={QttProps}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={closeDialog} color="error">
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={updateQuantity}
            variant="contained"
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CartCard;
