import mongoose, { Schema } from "mongoose";
import { WishListType } from "../types/types";

const WishListSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
      },
    ],
  },
  { timestamps: true }
);

const WishList =
  (mongoose.models.WishList as mongoose.Model<WishListType>) ||
  mongoose.model<WishListType>("WishList", WishListSchema);
export default WishList;
