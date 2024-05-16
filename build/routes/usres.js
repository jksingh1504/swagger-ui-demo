"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
//update user
router.put("/update", async (req, res, next) => {
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
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            req.body.password = hashedPassword;
        }
        const updatedUser = await user_1.default.findByIdAndUpdate(userId, {
            $set: req.body,
        }, { new: true }).select("-password");
        res.status(200).json({ message: "update successful", user: updatedUser });
    }
    catch (error) {
        next(error);
    }
});
// get user
router.get("/", async (req, res, next) => {
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
        const user = await user_1.default.findById(userId);
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
// delete user
router.delete("/delete", async (req, res, next) => {
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
        const deleteduser = await user_1.default.findByIdAndDelete(userId);
        res
            .status(200)
            .json({ message: "delete successful.", user: deleteduser });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
