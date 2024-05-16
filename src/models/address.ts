import mongoose, { Schema } from "mongoose";
import { AddressType } from "../types/types";

const AddressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String, require: false },
    city: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    postalCode: { type: String, require: true },
  },
  { timestamps: true }
);

const Address =
  (mongoose.models.Address as mongoose.Model<AddressType>) ||
  mongoose.model<AddressType>("Address", AddressSchema);

export default Address;
