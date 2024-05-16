import express, { NextFunction, Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";
import Cart from "../models/cart";

const router = express.Router();

//create
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
            required: true,
            description:"pass the id of products to place order",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/orderSchema"
                    }  
                }
            }
        } 
    */
    /*
        #swagger.responses[201] = {
            description:"Order created",
            content: {
                "application/json": {
                    schema: {
                   
                        $ref: "#/components/schemas/createOrderSchemaRes"
                    }  
                }
            }
        } 
    */
    try {
      const { userId } = req;
      const { products } = req.body;
      const cart = await Cart.findOne({ user: userId });
      const newOrder = new Order({ user: userId, total_price: 0 });

      await Promise.all(
        products.map(async (product: string) => {
          await Promise.all(
            cart.products.map(async (cartProduct) => {
              if (cartProduct.product.toString() === product) {
                const currentProduct = await Product.findById(product);

                newOrder.products.push({
                  product: cartProduct.product,
                  quantity: cartProduct.quantity,
                });
                newOrder.total_price +=
                  cartProduct.quantity * currentProduct.price;
              }
            })
          );
        })
      );

      const order = await newOrder.save();
      res.status(201).json({ message: "new order created", order });
    } catch (error) {
      next(error);
    }
  }
);

//cancle or delete
router.delete(
  "/cancle/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.parameters['parameterName'] = {
        name: "id",
        in:  "path",                           
        description: "pass id of order to cancle",                 
        required: true,                   
        schema: {
          $ref: "#/components/schemas/idSchema"
        } 
} */
    /*
        #swagger.responses[200] = {
            description:"Order cancled",
            content: {
                "application/json": {
                    schema: {
                      message:"product added successfully",
                        $ref: "#/components/schemas/cancleOrderSchemaRes"
                    }  
                }
            }
        } 
    */
    try {
      const { id } = req.params;
      const cancledOrder = await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "order cancled", order: cancledOrder });
    } catch (error) {
      next(error);
    }
  }
);

// get user orders
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  /*
        #swagger.responses[200] = {
            description:"user all order details",
            content: {
                "application/json": {
                    schema: {
                      message:"product added successfully",
                        $ref: "#/components/schemas/userAllOrders"
                    }  
                }
            }
        } 
    */
  try {
    const { userId } = req;
    const orders = await Order.find({ user: userId }).populate("address");
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
});
export default router;
