import express, { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import verifyAdmin from "../middlewares/varify-admin";
import upload from "../middlewares/multer";
import uploadImage from "../util/upload-image";
import { CustomError } from "../middlewares/error";

const router = express();

// create product (only for admin)
router.post(
  "/create",
  verifyAdmin,
  upload.array("images"),
  async (req: Request, res: Response, next: NextFunction) => {
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
      const files = req.files as Express.Multer.File[];
      const images: String[] = [];
      // Use Promise.all to wait for all async operations to complete
      if (!files || !files.length) {
        throw new CustomError(400, "Please provide at least one product image");
      }
      await Promise.all(
        files.map(async (file) => {
          const result = await uploadImage(file.path);
          images.push(result.secure_url);
        })
      );
      req.body.image = images;
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res
        .status(201)
        .json({ message: "product added successfully", product: savedProduct });
    } catch (error) {
      next(error);
    }
  }
);

// search product
router.get(
  "/search/:query",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const products = await Product.find({
        $or: [
          { name: { $regex: new RegExp(query, "i") } },
          {
            category: { $regex: new RegExp(query, "i") },
          },
        ],
      });
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
);

// get all
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
});

// get products based on category
router.get(
  "/:category",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const products = await Product.find({ category });
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
);

// get by id
router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const product = await Product.findById(id);
      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
