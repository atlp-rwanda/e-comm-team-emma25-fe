/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Product } from "../../interfaces/Product";
import {
  Box,
  CssBaseline,
  Button,
  Container,
  Grid,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/DeleteForever";
import { AxiosClient } from "../../utils/AxiosClient";
import CircularProgress from "@mui/material/CircularProgress";
import cookies from "js-cookie"

interface ApiResponse {
  status: number;
  message: string;
  products: Product[];
}

const Products = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Product>({
    ProductID: "",
    ProductName: "",
    ProductPrice: 0,
    quantity: 0,
    available: true,
    ProductDesc: "",
    ProductOwner: "",
    createdAt: "",
    updatedAt: "",
    pro_images: [
      {
        ImageID: "",
        ImagePath: "",
        ImageType: "",
        ProductID: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  document.title = "Products Management || !SHOP";
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState<ApiResponse>({
    status: 0,
    message: "",
    products: [],
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProduct = (ProductID: string) => {
    setIsDeleting(true);
    console.log(ProductID);
    setIsDeleting(false);
  };
  const [fetching, setFetching] = useState(true);
const token = cookies.get("token");
  AxiosClient.get("/products/allSellerCollection", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.data.status == 200) {
        setProducts(response.data as ApiResponse);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setFetching(false));

  const handlePreviewClick = (prev: Product) => {
    setPreview(prev);
    handleOpen();
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/add-product"
            color="primary"
            startIcon={<AddBoxIcon />}
          >
            Add new
          </Button>
          <Container maxWidth="xl">
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "10px",
              }}
            >
              {fetching && (
                <>
                  <CircularProgress />{" "}
                  <Typography paragraph sx={{ fontWeight: 700 }}>
                    Fetching Products ...
                  </Typography>{" "}
                </>
              )}
              {products
                ? products.products.map((product, indx) => {
                    return (
                      <Grid key={indx} item xs={12} sm={6} md={5} lg={3}>
                        <Card
                          style={{
                            boxShadow: "0 0 10px 0 rgba(0,0,0,.4)",
                            borderRadius: 10,
                          }}
                        >
                          <CardMedia
                            component="img"
                            onClick={() => handlePreviewClick(product)}
                            alt={product.ProductName}
                            sx={{ height: "250px", objectFit: "cover" }}
                            image={product.pro_images[0].ImagePath}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {product.ProductName}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="p"
                              gutterBottom
                            >
                              {product.ProductDesc.substring(0, 90)} ...
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h5"
                              sx={{ fontWeight: 600 }}
                            >
                              RWF {product.ProductPrice}
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              size="small"
                              color="primary"
                              onClick={() =>
                                navigate("/edit-product", { state: product })
                              }
                              startIcon={<EditOutlinedIcon />}
                              variant="contained"
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              disabled={isDeleting}
                              onClick={() =>
                                handleDeleteProduct(product.ProductID)
                              }
                              startIcon={<Delete />}
                              variant="outlined"
                            >
                              Delete
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })
                : "No Products Found"}
            </Grid>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="product-modal-title"
            >
              <Box>
                <DialogTitle id="product-modal-title-success">
                  {preview?.ProductName}
                </DialogTitle>
                <DialogContent>
                  <img
                    src={preview?.pro_images[0].ImagePath}
                    alt={preview?.ProductName}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography
                    variant="h4"
                    style={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    RWF {preview?.ProductPrice}
                  </Typography>
                  <DialogContentText mb={2}>
                    {preview?.ProductName} <br />
                    <Typography paragraph>{preview?.ProductDesc}</Typography>
                  </DialogContentText>
                  <ImageList variant="quilted" cols={4} rowHeight={150}>
                    {preview.pro_images.map((image, i) => (
                      <ImageListItem key={i}>
                        <img
                          style={{ borderRadius: "5px" }}
                          src={image.ImagePath}
                          alt={preview?.ProductName}
                          id={image.ImageID}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Products;
