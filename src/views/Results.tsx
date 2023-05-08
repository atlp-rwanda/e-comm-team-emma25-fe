import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { AxiosClient } from "../utils/AxiosClient";
//  cart
import { AddToCart, AddtoWishlist } from "../interfaces/functions";
import { Toaster } from "react-hot-toast";
// products cards
import {
  Tooltip,
  Grid,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
} from "@mui/material";

// icons imports
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
// view one product
import ProductDetails from "../components/ProductDetails";
interface Product {
  ProductID: string;
  ProductName: string;
  ProductPrice: number;
  quantity: number;
  available: boolean;
  ProductDesc: string;
  ProductOwner: string;
  createdAt: string;
  updatedAt: string;
  pro_images: Image[];
}
interface Image {
  ImageID: string;
  ImagePath: string;
  ImageType: string;
  ProductID: string;
  createdAt: string;
  updatedAt: string;
}
interface ResponseData {
  status: number;
  message: string;
  products: Product[];
}

function Results() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("searchproduct");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchInProgress, setSearchInProgress] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setSearchInProgress(true);
      try {
        const response = await AxiosClient.get<ResponseData>(
          `/products/search?q=${searchQuery as string}`
        );
        console.log(response.data);
        const searchResultsData = response.data.products;
        setSearchResults(searchResultsData);
      } catch (error) {
        console.error(error);
      } finally {
        setSearchInProgress(false);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Toaster />
      <Navbar iconNumber={1} />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Search results for {searchQuery}
        </Typography>
        {searchResults.length === 0 && (
          <Typography variant="body1">No results found.</Typography>
        )}
        {searchResults.length > 0 && (
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {searchInProgress && <CircularProgress />}
            {searchResults.map((product) => (
              <Grid item key={product.ProductID} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea onClick={() => handleViewClick(product)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        product.pro_images.length > 0
                          ? product.pro_images[0].ImagePath
                          : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                      }
                      alt={product.ProductName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.ProductName}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Price:</strong> {product.ProductPrice}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Description: {product.ProductDesc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Tooltip title="Add to cart">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => AddToCart(product.ProductID)}
                      >
                        <AddShoppingCartOutlinedIcon />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Add to wishlist">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => AddtoWishlist(product.ProductID)}
                      >
                        <PlaylistAddCheckIcon />
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default Results;
