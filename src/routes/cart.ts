import express, { NextFunction, Request, Response } from "express";
import Cart from "../models/cart";
import { CustomError } from "../middlewares/error";

const router = express.Router();

// add to cart
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  /*  #swagger.requestBody = {
            required: true,
            descrption: "You can add any number for quantity. If not given default 1 is applied",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/cartSchema"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[201] = {
            description:" added to cart",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/cartSchemaRes"
                    }  
                }
            }
        } 
    */
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex === -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[existingProductIndex].quantity += quantity;
    }
    const savedCart = await cart.save();
    res
      .status(201)
      .json({ message: "Product added to the cart", cart: savedCart });
  } catch (error) {
    next(error);
  }
});

//remove from cart

router.delete(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/removeCartSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[200] = {
            description:" removed from cart",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/cartRemovedSchemaRes"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[404] = {
            description:"Cart not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/cartNotFound"
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      const { productId } = req.body;
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new CustomError(404, "Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity > 1) {
          cart.products[productIndex].quantity -= 1;
        } else {
          cart.products.splice(productIndex, 1);
        }
      } else {
        throw new CustomError(404, "Product not found in the cart");
      }

      const removedCart = await cart.save();
      res
        .status(200)
        .json({ message: "Product removed from the cart", cart: removedCart });
    } catch (error) {
      next(error);
    }
  }
);

//get user cart
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /*
        #swagger.responses[200] = {
            description:"user cart details",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userCart"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[404] = {
            description:"Cart not found",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/cartNotFound"
                    }  
                }
            }
        } 
    */
  try {
    const { userId } = req;
    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart) {
      throw new CustomError(404, "Cart not found");
    }
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
});

export default router;
