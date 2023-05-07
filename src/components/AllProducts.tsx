/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from "react";
import "@splidejs/react-splide/css";
import { Product } from "../interfaces/Product";
import {
  Box,
  CssBaseline,
  Container,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { AxiosClient } from "../utils/AxiosClient";
import CircularProgress from "@mui/material/CircularProgress";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AddToCart, AddtoWishlist } from "../interfaces/functions";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ProductDetails from "./ProductDetails";
interface ApiResponse {
  status: number;
  data: Product[];
}

const AllProducts = () => {
  const [products, setProducts] = useState<ApiResponse>({
    status: 0,
    data: [],
  });

  const [fetching, setFetching] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    AxiosClient.get("/products/")
      .then((response) => {
        if (response.data.status == 200) {
          setProducts(response.data as ApiResponse);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setFetching(false));
  }, []);
  const responsive = {
    768: {
      perPage: 2,
    },
    992: {
      perPage: 3,
      perMove: 2,
    },
    640: {
      perPage: 1,
      perMove: 1,
    },
  };

  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", width: "100%", bgcolor: "#E5E5CB" }}>
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
              All Products
            </Typography>
            {fetching ? (
              <CircularProgress />
            ) : (
              <>
                <Splide
                  options={{
                    perPage: 4,
                    gap: "10px",
                    breakpoints: responsive,
                    perMove: 2,
                    width: "95vw",
                    autoplay: true,
                    type: "loop",
                  }}
                  aria-labelledby="reactivity-example-heading"
                >
                  {products.data.map((product) => (
                    <SplideSlide key={product.ProductID}>
                      <Card sx={{ maxWidth: 345, mb: 2 }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.pro_images[0].ImagePath}
                          alt={product.ProductName}
                        />
                        <CardContent sx={{ height: 150, overflow: "hidden" }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.ProductName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.ProductDesc}
                          </Typography>
                          <Typography variant="h6" component="div">
                            ${product.ProductPrice.toLocaleString()}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            sx={{
                              mr: 1,
                              ml: 1,
                              mb: 1,
                            }}
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => handleViewClick(product)}
                          >
                            View
                          </Button>
                          <Tooltip title="Add to cart">
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                console.log("pressed add to cart");
                                console.log(product.ProductID);
                                AddToCart(product.ProductID);
                              }}
                            >
                              <AddShoppingCartOutlinedIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Add to wishlist">
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                console.log("pressed add to wishlist");
                                console.log(product.ProductID);
                                AddtoWishlist(product.ProductID);
                              }}
                            >
                              <PlaylistAddCheckIcon />
                            </Button>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </SplideSlide>
                  ))}
                </Splide>
              </>
            )}
          </Container>
        </Box>
      </Box>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default AllProducts;
