import express, { NextFunction, Request, Response } from "express";
import Admin from "../models/admin";
import { CustomError } from "../middlewares/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// register
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
            description:"Admin created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/adminSchemaRes"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[400] = {
            description:"Admin already exist",
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
      const { email, password, name } = req.body;
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        throw new CustomError(400, "Admin already exist");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newAdmin = new Admin({ ...req.body, password: hashedPassword });
      const savedAdmin = await newAdmin.save();
      const admin = { ...savedAdmin.toObject() };
      delete admin.password;
      res.status(201).json({ mesaage: "Admin created", admin });
    } catch (error) {
      next(error);
    }
  }
);

// login
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
            description:"Login successful and amin token added to cookies (adminToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfullAdminLogin"
                    }  
                }
            }
        } 
        #swagger.responses[404] = {
            description:"Admin not found",
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
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new CustomError(404, "Admin not found");
      }
      const match = bcrypt.compareSync(password, admin.password);
      if (!match) {
        throw new CustomError(400, "Incorrect password");
      }
      const token = jwt.sign(
        { _id: admin._id },
        process.env.JWT_ADMIN_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRE as string }
      );
      const loginUser = { ...admin.toObject() };
      delete loginUser.password;
      res
        .cookie("adminToken", token)
        .status(200)
        .json({ message: "Login successful", admin: loginUser });
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
            description:"Logout successful and removed admin token from cookie (adminToken)",
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
        .clearCookie("adminToken", {
          maxAge: 0,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
);

//get current admin
router.get(
  "/refetch",
  async (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.responses[200] = {
            description:"current admin data as per token id",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/currentAdmin"
                    }  
                }
            }
        } 
       #swagger.responses[401] = {
            description:"Unauthorized admin (if token not found / invalid)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/unauthorizedAdmin"
                    }  
                }
            }
        } 
         #swagger.responses[404] = {
            description:"Admin not found",
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
      const { adminToken } = req.cookies;
      if (!adminToken) {
        throw new CustomError(401, "Unauthorized admin");
      }
      const decoded = jwt.verify(
        adminToken,
        process.env.JWT_ADMIN_SECRET as string
      );
      const { _id } = decoded as jwt.JwtPayload;

      const admin = await Admin.findById(_id).select("-password");
      if (!admin) {
        throw new CustomError(404, "admin not found");
      }
      res.status(200).json({ admin });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
