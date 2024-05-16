import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/types";

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("User", UserSchema);

export default User;
