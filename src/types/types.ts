import mongoose from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
};
export type AdminType = {
  name: string;
  email: string;
  password: string;
};

export type ProductType = {
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string[];
  color: string[];
  size: string[];
};

export type OrderType = {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  total_price: number;
  status: string;
  address: mongoose.Types.ObjectId;
};

export type CartType = {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
};

export type WishListType = {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
  }[];
};

export type AddressType = {
  user: mongoose.Types.ObjectId;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};
