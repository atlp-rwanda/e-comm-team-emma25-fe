import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { OrderItem } from "../interfaces/order";
import "../assets/styles/order.css";
import { setOrderstatus } from "../interfaces/functions";

const statuses: string[] = [
  "Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
  "On hold",
  "Backordered",
  "Partially shipped",
  "Payment declined",
];

function AdminOrder(props: OrderItem) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [status, setStatus] = React.useState("");
  const open = Boolean(anchorEl);
  const [openbox, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setStatus(event.target.value);
    handleClickOpen();
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
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {props.status}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label={props.status}
                onChange={handleChange}
              >
                {statuses.map((status) => {
                  return (
                    <MenuItem key={status} value={status} onClick={() => {}}>
                      {status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
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
                      handleClickOpen();
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
        <Dialog
          open={openbox}
          onClose={handleCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Set order status"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to update the status of {props.Orderid} to{" "}
              {status}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>Cancel</Button>
            <Button
              onClick={() => {
                setOrderstatus(props.Orderid, status);
                handleCloseConfirmation();
              }}
            >
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default AdminOrder;
