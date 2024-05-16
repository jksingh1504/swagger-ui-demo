import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
const router = express.Router();

//update user
router.put(
  "/update",

  async (req: Request, res: Response, next: NextFunction) => {
    /* 
     #swagger.requestBody = {
            description: "Dont need to send all data. Only data to be updated.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSchema"
                    }  
                }
            }
        } 
       #swagger.responses[200] = {
            description:"User update successful",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfulUpdate"
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      const { password } = req.body;

      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      ).select("-password");
      res.status(200).json({ message: "update successful", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// get user
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /* 
   #swagger.responses[200] = {
            description:"User details",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/currentUser"
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
});

// delete user
router.delete(
  "/delete",

  async (req: Request, res: Response, next: NextFunction) => {
    /* 
   #swagger.responses[200] = {
            description:"User delete successful",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfulDelete"
                    }  
                }
            }
        } 
  */
    try {
      const { userId } = req;
      const deleteduser = await User.findByIdAndDelete(userId);
      res
        .status(200)
        .json({ message: "delete successful.", user: deleteduser });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
