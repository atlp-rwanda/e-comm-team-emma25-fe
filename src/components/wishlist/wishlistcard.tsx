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

interface wishlistcomponent {
  id: number;
  productId: string;
  image: string;
  name: string;
  price: number;
  description: string;
}
function Wishlistcard(props: wishlistcomponent) {
  // const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
          <MenuItem>Add To Cart</MenuItem>
          <MenuItem>Delete</MenuItem>
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
          >
            {" "}
            Add To Cart{" "}
          </Button>

          <Button size="small" startIcon={<Delete />} variant="outlined">
            {" "}
            remove
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

Wishlistcard.propTypes = {};

export default Wishlistcard;
