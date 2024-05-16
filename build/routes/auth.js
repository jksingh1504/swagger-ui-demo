"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../middlewares/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const router = express_1.default.Router();
//register
router.post("/register", async (req, res, next) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSchema"
                    }
                }
            }
        }
    */
    /*
        #swagger.responses[201] = {
            description:"User created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserSchemaRes"
                    }
                }
            }
        }
    */
    /*
        #swagger.responses[400] = {
            description:"User already exist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/alreadyExists"
                    }
                }
            }
        }
    */
    try {
        const { name, email, password } = req.body;
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            throw new error_1.CustomError(400, "User already exist");
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newUser = new user_1.default({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        const user = { ...savedUser.toObject() };
        delete user.password;
        res.status(201).json({ message: "Resister successful", user });
    }
    catch (error) {
        next(error);
    }
});
//login
router.post("/login", async (req, res, next) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSchema"
                    }
                }
            }
        }
         #swagger.responses[200] = {
            description:"Login successful and user token added to cookies (userToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfullLogin"
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
        #swagger.responses[400] = {
            description:"Incorrect Password",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/incorrectPassword"
                    }
                }
            }
        }
    */
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            throw new error_1.CustomError(404, "User not found");
        }
        const match = bcrypt_1.default.compareSync(password, user.password);
        if (!match) {
            throw new error_1.CustomError(400, "Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        const logiUser = { ...user.toObject() };
        delete logiUser.password;
        res
            .cookie("userToken", token)
            .status(200)
            .json({ message: "Login successful", user: logiUser });
    }
    catch (error) {
        next(error);
    }
});
//logout
router.get("/logout", async (req, res, next) => {
    /*
       #swagger.responses[200] = {
            description:"Logout successful and removed user token from cookie (userToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/logout"
                    }
                }
            }
        }
    */
    try {
        res
            .clearCookie("userToken", { maxAge: 0, secure: true, sameSite: "none" })
            .status(200)
            .json({ message: "Logout successful" });
    }
    catch (error) {
        next(error);
    }
});
//get current user
router.get("/refetch", verify_token_1.default, async (req, res, next) => {
    /*
      #swagger.responses[200] = {
            description:"current user data as per token id",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/currentUser"
                    }
                }
            }
        }
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
exports.default = router;
