export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
}

export interface IVariant extends Document {
  _id: string;
  productName: string;
  variant: string;
  price: number;
  quantity: number;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  categories: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  variants: any;
  quantity?: number;
}

export interface IOrder extends Document {
  userId: string;
  products: {
    product: string;
    variant?: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: object | string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderDate: string;
}
