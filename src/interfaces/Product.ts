export interface Product {
  ProductID: string;
  ProductName: string;
  ProductPrice: number;
  quantity: number;
  available: boolean;
  ProductDesc: string;
  ProductOwner: string;
  createdAt: string;
  updatedAt: string;
  pro_images: {
    ImageID: string;
    ImagePath: string;
    ImageType: string;
    ProductID: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface FormValues {
  pname: string;
  p_price: number;
  quantity: number;
  desc: string;
  imgs: FileList;
}

export interface wishitems {
  id: number;
  wishlistId: number;
  ProductID: string;
  createdAt: Date;
  updatedAt: Date;
  Product: Product;
}
