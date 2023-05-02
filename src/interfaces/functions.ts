import Cookies from "js-cookie";
import { AxiosClient } from "../utils/AxiosClient";
import toast from "react-hot-toast";
export function getCookie(name: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const gettoken: string | undefined = Cookies.get(name);
  return gettoken;
}
export function AddtoWishlist(ProductID: string) {
  const token: string | undefined = getCookie("token");
  if (token) {
    AxiosClient.post(`/products/wishlist/add/${ProductID}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status == 201) {
          toast.remove();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(error.response.data.message);
      });
  }
}

export function RemoveWishlistItem(ProductID: string) {
  const token: string | undefined = getCookie("token");
  let checkresposnse = false;
  if (token) {
    AxiosClient.delete(`/products/wishlist/remove/${ProductID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.status == 201) {
          toast.remove();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast.success(response.data.message);
          checkresposnse = true;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(error.response.data.message);
      });
    return checkresposnse;
  }
  return checkresposnse;
}
export function AddToCart(ProductID: string) {
  const token: string | undefined = getCookie("token");
  if (token) {
    AxiosClient.post(`/cart/add/${ProductID}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.statusCode == 200) {
          toast.remove();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(error.response.data.message);
      });
  }
}

export async function Checkout() {
  const token: string | undefined = getCookie("token");
  let cartID: undefined | number;

  if (token) {
    await AxiosClient.get(`/cart/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.statusCode == 200) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          cartID = response.data.cart.id;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(error.response.data.message);
      });

    // payment with stripe
    if (cartID) {
      AxiosClient.post(`/checkoutcart/${cartID}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          window.location.href = response.data.url;
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          toast(error.response.data.message);
        });
    }
  }
}
