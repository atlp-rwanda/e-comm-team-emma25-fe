import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Delete from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
// import  {useNavigate} from 'react-router-dom'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AddToCart } from "../../interfaces/functions";
import { RemoveWishlistItem } from "../../interfaces/functions";
import { wishitems } from "../../interfaces/Product";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type onDelete = (id: string) => any;

interface wishlistcomponent {
  items: wishitems[];
  id: number;
  productId: string;
  image: string;
  name: string;
  price: number;
  description: string;
  Delete: onDelete;
}
function Wishlistcard(props: wishlistcomponent) {
  // const navigate = useNavigate();
  const [openbox, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        key={props.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CardMedia sx={{ width: 151 }} component="img" image={props.image} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography component="h1" variant="h5" sx={{ fontWeight: 100 }}>
                {props.name}
              </Typography>
              <Typography component="p">{props.description}</Typography>
              <Typography component="h2" sx={{ fontWeight: 600 }}>
                RWF {props.price}
              </Typography>
            </Box>
          </CardContent>
        </Box>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                AddToCart(props.productId);
              }}
            >
              Add To Cart
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleClickOpen();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <CardContent
            sx={{
              display: { xs: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="small"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              variant="outlined"
              onClick={() => AddToCart(props.productId)}
            >
              {" "}
              Add To Cart{" "}
            </Button>

            <Button
              size="small"
              startIcon={<Delete />}
              variant="outlined"
              onClick={() => {
                handleClose();
                handleClickOpen();
              }}
            >
              {" "}
              remove
            </Button>
          </CardContent>
        </Box>
      </Card>
      <Dialog
        open={openbox}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Product from wishlist"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img
              src={props.image}
              alt={`${props.name}`}
              loading="lazy"
              width="30"
              height="35"
            />
            Are you sure you want to delete {props.name} form your wishlist
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseConfirmation();
              RemoveWishlistItem(props.productId);
              props.Delete(props.productId);
            }}
          >
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Wishlistcard.propTypes = {};

export default Wishlistcard;
