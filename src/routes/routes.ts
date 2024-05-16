import express from "express";
import authRoutes from "./auth";
import userRoutes from "./usres";
import productRoutes from "./products";
import addressRoutes from "./address";
import orderRoutes from "./order";
import cartRoutes from "./cart";
import wishlistRoutes from "./wishlist";
import adminAuthRoutes from "./admin-auth";
import verifyToken from "../middlewares/verify-token";
const router = express.Router();

router.use(
  "/api/auth",
  authRoutes
  // #swagger.tags = ['User Authentication']
  /*  #swagger.responses[500] = {
            description:"Internal server error",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/internalError"
                    }  
                }
            }
        }
  */
);
router.use(
  "/api/admin-auth",
  adminAuthRoutes
  // #swagger.tags = ['Admin Authentication']
  /*  
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);
router.use(
  "/api/user",
  verifyToken,
  userRoutes
  // #swagger.tags = ['User']

  /* 
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
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);
router.use(
  "/api/address",
  verifyToken,
  addressRoutes
  // #swagger.tags = ['User Address']
  /* 
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
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);
router.use(
  "/api/product",
  productRoutes
  // #swagger.tags = ['Products']
  /* 
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);

router.use(
  "/api/order",
  verifyToken,
  orderRoutes
  // #swagger.tags = ['User Products Order']
  /* 
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
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);
router.use(
  "/api/cart",
  verifyToken,
  cartRoutes
  // #swagger.tags = ['User Cart']
  /* 
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
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);
router.use(
  "/api/wishlist",
  verifyToken,
  wishlistRoutes
  // #swagger.tags = ['User Products Wishlist']
  /* 
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
    #swagger.responses[500] = {
      description:"Internal server error",
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/internalError"
              }  
          }
      }
    }
  */
);

export default router;
