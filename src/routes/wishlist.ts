import express, { NextFunction, Request, Response } from "express";
import WishList from "../models/wishlist";
import { CustomError } from "../middlewares/error";

const router = express.Router();

// add to wishlist
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  /*  #swagger.requestBody = {
            required: true,
            description:"pass the id of product to add wishlist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/wishlistSchema"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[201] = {
            description:"Product added to the wishlist",
            content: {
                "application/json": {
                    schema: {
                   
                        $ref: "#/components/schemas/wishlistAddedRes"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[400] = {
            description:"product id not provided or Product already exists in the wishlist",
            content: {
                "application/json": {
                    schema: {
                      "oneOf": [
                          { "$ref": "#/components/schemas/wishlistProductExist" },
                          { "$ref": "#/components/schemas/productIdNotFound" }
                        ]
                    }  
                }
            }
        } 
    */

  try {
    const { userId } = req;
    const { productId } = req.body;
    if (!productId) {
      throw new CustomError(400, "product id not provided");
    }
    let wishlist = await WishList.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new WishList({ user: userId, products: [] });
    }

    const existingProduct = wishlist.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      throw new CustomError(400, "Product already exists in the wishlist");
    } else {
      wishlist.products.push({ product: productId });
    }

    const savedwishlist = await wishlist.save();
    res.status(201).json({
      message: "Product added to the wishlist",
      wishlist: savedwishlist,
    });
  } catch (error) {
    next(error);
  }
});

//remove from wislist

router.delete(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            description:"pass the id of product to remove from wishlist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/wishlistSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[201] = {
            description:"Product removed from the wishlist",
            content: {
                "application/json": {
                    schema: {
                   
                        $ref: "#/components/schemas/wishlistProductRemoved"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[400] = {
            description: "product id not provided or Product already exists in the wishlist",
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/productIdNotFound" 
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[404] = {
            description:"wishlist not found",
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/wishlistNotFound" 
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      const { productId } = req.body;
      if (!productId) {
        throw new CustomError(400, "product id not provided");
      }
      let wishlist = await WishList.findOne({ user: userId });
      if (!wishlist) {
        throw new CustomError(404, "wishlist not found");
      }

      const removedwishlist = wishlist.products.find(
        (item) => item.product.toString() === productId
      );

      wishlist.products = wishlist.products.filter(
        (item) => item.product.toString() !== productId
      );

      await wishlist.save();
      res.status(201).json({
        message: "Product removed from the wishlist",
        removedwishlist,
      });
    } catch (error) {
      next(error);
    }
  }
);

//get user wishlist
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /*
        #swagger.responses[200] = {
            description:"login user's wishlist",
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/userWishlist" 
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[404] = {
            description:"wishlist not found",
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/wishlistNotFound" 
                    }  
                }
            }
        } 
    */
  try {
    const { userId } = req;
    let wishlist = await WishList.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!wishlist) {
      throw new CustomError(404, "wishlist not found");
    }
    res.status(200).json({ wishlist });
  } catch (error) {
    next(error);
  }
});

export default router;
