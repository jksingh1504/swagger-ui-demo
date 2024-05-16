"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../models/product"));
const varify_admin_1 = __importDefault(require("../middlewares/varify-admin"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const upload_image_1 = __importDefault(require("../util/upload-image"));
const error_1 = require("../middlewares/error");
const router = (0, express_1.default)();
// create product (only for admin)
router.post("/create", varify_admin_1.default, multer_1.default.array("images"), async (req, res, next) => {
    /*  #swagger.requestBody = {
            required: true,
            description:"Only admin can access this route. Admin login required to create a product.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/productSchema"
                    }
                }
            }
        }
    */
    /*
        #swagger.responses[201] = {
            description:"Product created",
            content: {
                "application/json": {
                    schema: {
                      message:"product added successfully",
                        $ref: "#/components/schemas/productSchemaRes"
                    }
                }
            }
        }
    */
    /*
        #swagger.responses[400] = {
            description:"Product image not provided",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/productImage"
                    }
                }
            }
        }
    */
    try {
        const files = req.files;
        const images = [];
        // Use Promise.all to wait for all async operations to complete
        if (!files || !files.length) {
            throw new error_1.CustomError(400, "Please provide at least one product image");
        }
        await Promise.all(files.map(async (file) => {
            const result = await (0, upload_image_1.default)(file.path);
            images.push(result.secure_url);
        }));
        req.body.image = images;
        const product = new product_1.default(req.body);
        const savedProduct = await product.save();
        res
            .status(201)
            .json({ message: "product added successfully", product: savedProduct });
    }
    catch (error) {
        next(error);
    }
});
// search product
router.get("/search/:query", async (req, res, next) => {
    /* #swagger.parameters['parameterName'] = {
        name: "query",
        in:  "path",
        description: "search by product name or category",
        required: true,
        schema: {
          $ref: "#/components/schemas/searchSchema"
        }
} */
    /*
        #swagger.responses[200] = {
            description:"All product related to search query",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/searchProduct"
                    }
                }
            }
        }
    */
    try {
        const { query } = req.params;
        const products = await product_1.default.find({
            $or: [
                { name: { $regex: new RegExp(query, "i") } },
                {
                    category: { $regex: new RegExp(query, "i") },
                },
            ],
        });
        res.status(200).json({ products });
    }
    catch (error) {
        next(error);
    }
});
// get all
router.get("/", async (req, res, next) => {
    /*
          #swagger.responses[200] = {
              description:"All product",
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/searchProduct"
                      }
                  }
              }
          }
      */
    try {
        const products = await product_1.default.find();
        res.status(200).json({ products });
    }
    catch (error) {
        next(error);
    }
});
// get products based on category
router.get("/:category", async (req, res, next) => {
    /* #swagger.parameters['parameterName'] = {
        name: "category",
        in:  "path",
        description: "search by product category",
        required: true,
        schema: {
          $ref: "#/components/schemas/searchSchema"
        }
} */
    /*
        #swagger.responses[200] = {
            description:"All product related to category",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/searchProduct"
                    }
                }
            }
        }
    */
    try {
        const { category } = req.params;
        const products = await product_1.default.find({ category });
        res.status(200).json({ products });
    }
    catch (error) {
        next(error);
    }
});
// get by id
router.get("/get/:id", async (req, res, next) => {
    /* #swagger.parameters['parameterName'] = {
        name: "id",
        in:  "path",
        description: "search by product id",
        required: true,
        schema: {
          $ref: "#/components/schemas/idSchema"
        }
} */
    /*
        #swagger.responses[200] = {
            description:"product related to id",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/productSchemaRes"
                    }
                }
            }
        }
    */
    try {
        const { id } = req.params;
        const product = await product_1.default.findById(id);
        res.status(200).json({ product });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
