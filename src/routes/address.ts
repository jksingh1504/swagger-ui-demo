import express, { NextFunction, Request, Response } from "express";
import Address from "../models/address";
import { CustomError } from "../middlewares/error";

const router = express.Router();

//create
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            description: "addressLine2 is optional, user id not required. rest are mandetory. no need to send user id. login user id added to it.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[201] = {
            description:"Address created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressRes"
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      req.body.user = userId;
      const newAddress = new Address(req.body);
      const savedAddress = await newAddress.save();
      res.status(201).json({
        message: "Address created",
        address: savedAddress,
      });
    } catch (error) {
      next(error);
    }
  }
);

//update
router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.parameters['parameterName'] = {
        name: "id",
        in:  "path",                           
        description: "provide id of the address",                 
        required: true,                   
        schema: {
          $ref: "#/components/schemas/idSchema"
        } 
} */
    /*  #swagger.requestBody = {
            description: "all field are not mandatory. user id cannot be changed regardless it is passed or not. In below request we changed last 2 digit of user id, but in response it not changed.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressUpdateSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[200] = {
            description:"Address updated",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressUpdateRes"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[400] = {
            description:"Address not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressNotFound"
                    }  
                }
            }
        } 
    */
    try {
      const { id } = req.params;
      delete req.body.user;
      const updatedAddress = await Address.findOneAndUpdate(
        {
          _id: id,
          user: req.userId,
        },
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedAddress) {
        throw new CustomError(400, "Address not found");
      }
      res
        .status(200)
        .json({ message: "Address updated", address: updatedAddress });
    } catch (error) {
      next(error);
    }
  }
);

//delete
router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.parameters['parameterName'] = {
        name: "id",
        in:  "path",                           
        description: "provide id of the address",                 
        required: true,                   
        schema: {
          $ref: "#/components/schemas/idSchema"
        } 
    } 
    */

    /*
        #swagger.responses[200] = {
            description:"Address deleted",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressDeleteRes"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[400] = {
            description:"Address not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressNotFound"
                    }  
                }
            }
        } 
    */
    try {
      const { id } = req.params;
      const deletedAddress = await Address.findOneAndDelete({
        _id: id,
        user: req.userId,
      });
      if (!deletedAddress) {
        throw new CustomError(400, "Address not found");
      }
      res
        .status(200)
        .json({ message: "Address deleted", addres: deletedAddress });
    } catch (error) {
      next(error);
    }
  }
);

//get user addresses
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /*
        #swagger.responses[200] = {
            description:"login user's all addresses",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userAddresses"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[400] = {
            description:"Address not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addressNotFound"
                    }  
                }
            }
        } 
    */
  try {
    const { userId } = req;
    const addresses = await Address.find({ user: userId });
    res.status(200).json({ addresses });
  } catch (error) {
    next(error);
  }
});
export default router;
