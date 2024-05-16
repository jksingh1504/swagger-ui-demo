import mongoose, { Schema } from "mongoose";
import { CartType } from "../types/types";

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
        quantity: {
          type: Number,
          require: true,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart =
  (mongoose.models.Cart as mongoose.Model<CartType>) ||
  mongoose.model<CartType>("Cart", CartSchema);
export default Cart;
