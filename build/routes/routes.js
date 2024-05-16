"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const usres_1 = __importDefault(require("./usres"));
const products_1 = __importDefault(require("./products"));
const address_1 = __importDefault(require("./address"));
const order_1 = __importDefault(require("./order"));
const cart_1 = __importDefault(require("./cart"));
const wishlist_1 = __importDefault(require("./wishlist"));
const admin_auth_1 = __importDefault(require("./admin-auth"));
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const router = express_1.default.Router();
router.use("/api/auth", auth_1.default
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
router.use("/api/admin-auth", admin_auth_1.default
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
router.use("/api/user", verify_token_1.default, usres_1.default
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
router.use("/api/address", verify_token_1.default, address_1.default
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
router.use("/api/product", products_1.default
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
router.use("/api/order", verify_token_1.default, order_1.default
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
router.use("/api/cart", verify_token_1.default, cart_1.default
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
router.use("/api/wishlist", verify_token_1.default, wishlist_1.default
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
exports.default = router;
