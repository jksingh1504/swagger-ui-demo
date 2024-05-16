import mongoose, { Schema } from "mongoose";
import { AdminType } from "../types/types";

const AdminSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const Admin =
  (mongoose.models.Admin as mongoose.Model<AdminType>) ||
  mongoose.model<AdminType>("Admin", AdminSchema);

export default Admin;
