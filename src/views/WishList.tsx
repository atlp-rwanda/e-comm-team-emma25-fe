import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/bottomNav.css";
import { CircularProgress, Typography } from "@mui/material";
import Wishlistcard from "../components/wishlist/wishlistcard";
import Box from "@mui/material/Box";
import { AxiosClient } from "../utils/AxiosClient";
import Cookies from "js-cookie";
import { wishitems } from "../interfaces/Product";
import { Toaster } from "react-hot-toast";
function WishList() {
  const [wishitems, setItems] = useState<wishitems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  function getCookie(name: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const gettoken: string | undefined = Cookies.get(name);
    return gettoken;
  }

  const token: string | undefined = getCookie("token");
  if (token == undefined) {
    window.location.href = "/login";
  }

  const handleDelete = (id: string) => {
    setItems(wishitems.filter((item: wishitems) => item.ProductID != id));
  };

  console.log("getting the data:");
  useEffect(() => {
    if (token) {
      AxiosClient.get("/products/wishlist/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.status == 200) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setItems(response.data.data[0].WishlistItems);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div>
      <Toaster />
      <Navbar iconNumber={5} />
      <div className="secondoption">
        <Typography
          component="div"
          variant="h3"
          color="primary"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Wishlist
        </Typography>
      </div>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            left: "unset",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <CircularProgress
              color="primary"
              sx={{ zIndex: "100", margin: "auto" }}
            />
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "10px auto",
        }}
      >
        {wishitems ? (
          wishitems.map((item, index) => {
            return (
              <Wishlistcard
                key={index}
                items={wishitems}
                id={item.id}
                productId={item.ProductID}
                name={item.Product.ProductName}
                description={item.Product.ProductDesc}
                price={item.Product.ProductPrice}
                image={item.Product.pro_images[0].ImagePath}
                Delete={handleDelete}
              />
            );
          })
        ) : (
          <h1>No Items are in your wish list collection</h1>
        )}
      </Box>
    </div>
  );
}

export default WishList;
