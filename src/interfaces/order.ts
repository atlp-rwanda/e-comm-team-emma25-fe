interface orderproduct {
  orderid: number;
  price: number;
  productName: string;
  productId: string;
  productQuantity: number;
}

export interface OrderItem {
  Orderid: 35;
  expectedDeliveryDate: Date;
  amountPaid: number;
  userId: number;
  paymentid: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderProducts: orderproduct[];
}
