import React from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/bottomNav.css";
import { Typography } from "@mui/material";
import Wishlistcard from "../components/wishlist/wishlistcard";
import Box from "@mui/material/Box";
import { AxiosClient } from "../utils/AxiosClient";
// interface wishitems {
//   id: number,
//   wishlistId: number,
//   ProductID: string,
//   createdAt: Date,
//   updatedAt: Date,
//   Product: {
//       ProductID: string,
//       ProductName: string,
//       ProductPrice: number,
//       quantity: number,
//       available: boolean,
//       ProductDesc: string,
//       ProductOwner: number,
//       createdAt: Date,
//       updatedAt: Date
//       }
// }
import Cookies from "js-cookie";

function WishList() {
  function getCookie(name: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const gettoken: string | undefined = Cookies.get(name);
    return gettoken;
  }
  const token: string | undefined = getCookie("token");
  // const [Wishlistitems,setItems] = useState<wishitems[]>([])
  console.log("getting the data:");
  if (token) {
    AxiosClient.get("/products/wishlist/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status == 200) {
          console.log(response);
          console.log(response.data.data[0].WishlistItems);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Navbar iconNumber={5} />
      <div className="secondoption">
        <Typography
          component="div"
          variant="h3"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Wishlist
        </Typography>
      </div>
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "10px auto",
        }}
      >
        <Wishlistcard
          id={1}
          productId="mhvdtyh"
          name="lamborgin"
          description="expensive car"
          price={2000000}
          image="https://yourtestdriver.com/wp-content/uploads/2022/06/2a2d0c89-aa71-41b9-b376-2f3f8f330bcf-1536x1152.jpg"
        />
        <Wishlistcard
          id={3}
          productId="mhvdtyh"
          name="lamborgin"
          description="expensive car"
          price={2000000}
          image="https://yourtestdriver.com/wp-content/uploads/2022/06/2a2d0c89-aa71-41b9-b376-2f3f8f330bcf-1536x1152.jpg"
        />
      </Box>
    </div>
  );
}

export default WishList;
