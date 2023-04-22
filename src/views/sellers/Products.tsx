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
} from "@mui/material";
// import Navigation from "../../components/Navigation";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/DeleteForever";
import { AxiosClient } from "../../utils/AxiosClient";
import CircularProgress from "@mui/material/CircularProgress";

interface ApiResponse {
  status: number;
  message: string;
  products: Product[];
}

const Products = () => {
  const navigate = useNavigate();
  document.title = "Products Management || !SHOP";
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
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE1LCJlbWFpbCI6InNlbGxlckBnbWFpbC5jb20iLCJuYW1lIjoiU2VsbGVyIFRvU2VsbCIsInBob25lIjpudWxsLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNjgxOTQ3NzA1LCJleHAiOjE2ODI1NTI1MDV9.76xioS964YQ-ChUEqYIGsN1T9rO8cP3MUvvI6OHaXnE";
  AxiosClient.get("/products/allSellerCollection")
    .then((response) => {
      if (response.data.status == 200) {
        setProducts(response.data as ApiResponse);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setFetching(false));

  const handlePreviewClick = (indx: number) => {
    console.log(indx);
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* <Navigation /> */}
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
                            onClick={() => handlePreviewClick(indx)}
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
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Products;
