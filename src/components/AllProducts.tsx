/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Product } from "../interfaces/Product";
import {
  Box,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { AxiosClient } from "../utils/AxiosClient";
import CircularProgress from "@mui/material/CircularProgress";


interface ApiResponse {
  status: number;
  message: string;
  products: Product[];
}

const AllProducts = () => {
  const [products, setProducts] = useState<ApiResponse>({
    status: 0,
    message: "",
    products: [],
  });

  const [fetching, setFetching] = useState(true);

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


    console.log("This is before return", products);

  return (
    // <>
    //   <CssBaseline />
    //   <Box sx={{ display: "flex" }}>
    //     <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
    //       <Container maxWidth="xl">
    //         <Grid
    //           container
    //           spacing={2}
    //           style={{
    //             display: "flex",
    //             justifyContent: "flex-start",
    //             marginTop: "10px",
    //           }}
    //         >
    //           {fetching && (
    //             <>
    //               <CircularProgress />{" "}
    //               <Typography paragraph sx={{ fontWeight: 700 }}>
    //                 Fetching Products ...
    //               </Typography>{" "}
    //             </>
    //           )}
    //           {products
    //             ? products.products.map((product, indx) => {
    //                 return (
    //                   <Grid key={indx} item xs={12} sm={6} md={5} lg={3}>
    //                     <Card
    //                       style={{
    //                         boxShadow: "0 0 10px 0 rgba(0,0,0,.4)",
    //                         borderRadius: 10,
    //                       }}
    //                     >
    //                       <CardMedia
    //                         component="img"
    //                         // onClick={() => handlePreviewClick(product)}
    //                         alt={product.ProductName}
    //                         sx={{ height: "250px", objectFit: "cover" }}
    //                         image={product.pro_images[0].ImagePath}
    //                       />
    //                       <CardContent>
    //                         <Typography
    //                           gutterBottom
    //                           variant="h5"
    //                           component="h2"
    //                         >
    //                           {product.ProductName}
    //                         </Typography>
    //                         <Typography
    //                           variant="body2"
    //                           color="text.secondary"
    //                           component="p"
    //                           gutterBottom
    //                         >
    //                           {product.ProductDesc.substring(0, 90)} ...
    //                         </Typography>
    //                         <Typography
    //                           gutterBottom
    //                           variant="h5"
    //                           component="h5"
    //                           sx={{ fontWeight: 600 }}
    //                         >
    //                           RWF {product.ProductPrice}
    //                         </Typography>
    //                       </CardContent>
    //                       <CardActions
    //                         sx={{
    //                           display: "flex",
    //                           justifyContent: "space-between",
    //                         }}
    //                       ></CardActions>
    //                     </Card>
    //                   </Grid>
    //                 );
    //               }) : "No Products Found"}
    //         </Grid>
    //       </Container>
    //     </Box>
    //   </Box>
    // </>

    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Container maxWidth="xl">
            {fetching ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={2}>
                {products.products?.map((product: Product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product.ProductID}
                  >
                    <Card sx={{ height: "100%" }}>
                      <CardMedia
                        component="img"
                        image={product.pro_images[0].ImagePath}
                        alt={product.ProductName}
                        sx={{ height: 0, paddingTop: "56.25%" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.ProductName}
                        </Typography>
                        <Typography>{product.ProductDesc}</Typography>
                        <Typography sx={{ flexGrow: 1 }} />
                        <Typography variant="h6" component="div">
                          &#8358;{product.ProductPrice.toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Add to cart</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AllProducts;
