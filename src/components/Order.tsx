import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { OrderItem } from "../interfaces/order";
import "../assets/styles/order.css";

function Order(props: OrderItem) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box>
        <Box className="ordercomp">
          <Typography
            component="div"
            variant="h5"
            fontSize="small"
            color="primary"
          >
            Owner: {props.userId}
          </Typography>
          <Typography
            component="div"
            variant="h5"
            fontSize="small"
            color="primary"
          >
            Date: {props.createdAt}
          </Typography>
          <Typography
            component="div"
            variant="h5"
            fontSize="small"
            color="primary"
          >
            Price: {props.amountPaid}
          </Typography>
          <Typography component="div" variant="h5" color="primary">
            status: {props.status}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              Products
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {props.orderProducts.map((product) => {
                return (
                  <MenuItem
                    key={product.productId}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    {product.productName}: {product.productQuantity} X $
                    {product.price}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Box>

        <Divider />
      </Box>
    </div>
  );
}

export default Order;
