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

export interface IHouse {
  id: string;
  propertyId: string;
  ownerId: string;
  name: string;
  description: string;
  address: string;
  city: string;
  yearBuilt: number;
  propertyType: string;
  interior: string;
  gas: string;
  bedrooms: number;
  numberOfBalcony: number;
  parking: number;
  rentPerMonth: string;
  roomSize: string;
  status: string;
  availabilityDate: string;
  houseImage?: string[];
  createdAt: string;
  updatedAt: string;
}
