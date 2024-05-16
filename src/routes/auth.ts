import express, { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verify-token";
const router = express.Router();

//register
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[201] = {
            description:"User created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSchemaRes"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[400] = {
            description:"User already exist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/alreadyExists"
                    }  
                }
            }
        } 
    */

    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new CustomError(400, "User already exist");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const savedUser = await newUser.save();
      const user = { ...savedUser.toObject() };
      delete user.password;
      res.status(201).json({ message: "Resister successful", user });
    } catch (error) {
      next(error);
    }
  }
);

//login
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSchema"
                    }  
                }
            }
        } 
         #swagger.responses[200] = {
            description:"Login successful and user token added to cookies (userToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfullLogin"
                    }  
                }
            }
        } 
        #swagger.responses[404] = {
            description:"User not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/notFound"
                    }  
                }
            }
        } 
        #swagger.responses[400] = {
            description:"Incorrect Password",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/incorrectPassword"
                    }  
                }
            }
        }  
    */
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new CustomError(404, "User not found");
      }
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        throw new CustomError(400, "Incorrect password");
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRE as string }
      );
      const logiUser = { ...user.toObject() };
      delete logiUser.password;
      res
        .cookie("userToken", token)
        .status(200)
        .json({ message: "Login successful", user: logiUser });
    } catch (error) {
      next(error);
    }
  }
);

//logout
router.get(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    /*
       #swagger.responses[200] = {
            description:"Logout successful and removed user token from cookie (userToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/logout"
                    }  
                }
            }
        } 
    */
    try {
      res
        .clearCookie("userToken", { maxAge: 0, secure: true, sameSite: "none" })
        .status(200)
        .json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
);

//get current user
router.get(
  "/refetch",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.responses[200] = {
            description:"current user data as per token id",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/currentUser"
                    }  
                }
            }
        } 
       #swagger.responses[401] = {
            description:"Unauthorized user (if token not found / invalid)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/unauthorized"
                    }  
                }
            }
        } 
         #swagger.responses[404] = {
            description:"User not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/notFound"
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      const user = await User.findById(userId);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
