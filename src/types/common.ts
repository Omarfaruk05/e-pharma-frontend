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

export interface IUser {
  photo: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id?: string;
}

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
    primary: { name: string };
    secondary: { name: string };
    tertiary: { name: string };
  };
  variants: any;
  quantity?: number;
}
export interface IShippingAddress {
  _id: string;
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id?: string;
}

export interface IOrder extends Document {
  _id: string;
  userId: string;
  products: {
    product: string;
    variant?: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderDate: string;
}
