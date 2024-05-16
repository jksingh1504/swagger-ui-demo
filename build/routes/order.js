"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const cart_1 = __importDefault(require("../models/cart"));
const router = express_1.default.Router();
//create
router.post("/create", async (req, res, next) => {
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
        const cart = await cart_1.default.findOne({ user: userId });
        const newOrder = new order_1.default({ user: userId, total_price: 0 });
        await Promise.all(products.map(async (product) => {
            await Promise.all(cart.products.map(async (cartProduct) => {
                if (cartProduct.product.toString() === product) {
                    const currentProduct = await product_1.default.findById(product);
                    newOrder.products.push({
                        product: cartProduct.product,
                        quantity: cartProduct.quantity,
                    });
                    newOrder.total_price +=
                        cartProduct.quantity * currentProduct.price;
                }
            }));
        }));
        const order = await newOrder.save();
        res.status(201).json({ message: "new order created", order });
    }
    catch (error) {
        next(error);
    }
});
//cancle or delete
router.delete("/cancle/:id", async (req, res, next) => {
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
        const cancledOrder = await order_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "order cancled", order: cancledOrder });
    }
    catch (error) {
        next(error);
    }
});
// get user orders
router.get("/", async (req, res, next) => {
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
        const orders = await order_1.default.find({ user: userId }).populate("address");
        res.status(200).json({ orders });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
