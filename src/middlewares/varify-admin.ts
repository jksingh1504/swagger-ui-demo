import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./error";
import Admin from "../models/admin";

declare global {
  namespace Express {
    interface Request {
      adminId: string;
    }
  }
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { adminToken } = req.cookies;
    if (!adminToken) {
      throw new CustomError(401, "Unauthorized admin");
    }
    const decoded = jwt.verify(
      adminToken,
      process.env.JWT_ADMIN_SECRET as string
    );
    const { _id } = decoded as jwt.JwtPayload;
    const admin = await Admin.findById(_id);
    if (!admin) {
      throw new CustomError(404, "Admin not found");
    }
    req.adminId = _id;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyAdmin;
