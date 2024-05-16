import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./error";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userToken } = req.cookies;
    if (!userToken) {
      throw new CustomError(401, "Unauthorized user");
    }
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET as string);
    const { _id } = decoded as jwt.JwtPayload;
    const user = await User.findById(_id);
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    req.userId = _id;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
