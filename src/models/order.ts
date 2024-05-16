import mongoose, { Schema, mongo } from "mongoose";
import { OrderType } from "../types/types";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    total_price: { type: Number, require: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      require: true,
      default: "pending",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      require: true,
    },
  },
  { timestamps: true }
);

const Order =
  (mongoose.models.Order as mongoose.Model<OrderType>) ||
  mongoose.model<OrderType>("Order", OrderSchema);
export default Order;
