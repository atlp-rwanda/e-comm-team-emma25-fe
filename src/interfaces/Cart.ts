export interface Cart {
  statusCode: number;
  message: string;
  cart: {
    id: number;
    buyerId: number;
    Total: number;
    createdAt: string;
    updatedAt: string;
    userId: null | number | string;
    CartItems: [
      {
        id: number;
        cartId: number;
        productID: string;
        price: number;
        ProductName: string;
        image: string;
        quantity: number;
        createdAt: string;
        updatedAt: string;
      }
    ];
  };
}

export interface CartContent {
  image: string;
  productName: string;
  quantity: number;
  price: number;
  id: number;
}
