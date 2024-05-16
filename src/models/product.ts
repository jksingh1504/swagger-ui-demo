import mongoose, { Schema } from "mongoose";
import { ProductType } from "../types/types";

const ProductSchema = new Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    image: [{ type: String, require: true }],
    category: [{ type: String, require: true }],
    color: [{ type: String, require: true }],
    size: [{ type: String, require: true }],
  },
  { timestamps: true }
);

const Product =
  (mongoose.models.Product as mongoose.Model<ProductType>) ||
  mongoose.model<ProductType>("Product", ProductSchema);

export default Product;
