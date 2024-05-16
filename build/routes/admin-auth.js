"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../models/admin"));
const error_1 = require("../middlewares/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// register
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
            description:"Admin created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/adminSchemaRes"
                    }
                }
            }
        }
    */
    /*
        #swagger.responses[400] = {
            description:"Admin already exist",
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
        const { email, password, name } = req.body;
        const existingAdmin = await admin_1.default.findOne({ email });
        if (existingAdmin) {
            throw new error_1.CustomError(400, "Admin already exist");
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newAdmin = new admin_1.default({ ...req.body, password: hashedPassword });
        const savedAdmin = await newAdmin.save();
        const admin = { ...savedAdmin.toObject() };
        delete admin.password;
        res.status(201).json({ mesaage: "Admin created", admin });
    }
    catch (error) {
        next(error);
    }
});
// login
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
            description:"Login successful and amin token added to cookies (adminToken)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/successfullAdminLogin"
                    }
                }
            }
        }
        #swagger.responses[404] = {
            description:"Admin not found",
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
        const admin = await admin_1.default.findOne({ email });
        if (!admin) {
            throw new error_1.CustomError(404, "Admin not found");
        }
        const match = bcrypt_1.default.compareSync(password, admin.password);
        if (!match) {
            throw new error_1.CustomError(400, "Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ _id: admin._id }, process.env.JWT_ADMIN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        const loginUser = { ...admin.toObject() };
        delete loginUser.password;
        res
            .cookie("adminToken", token)
            .status(200)
            .json({ message: "Login successful", admin: loginUser });
    }
    catch (error) {
        next(error);
    }
});
//logout
router.get("/logout", async (req, res, next) => {
    /*
       #swagger.responses[200] = {
            description:"Logout successful and removed admin token from cookie (adminToken)",
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
            .clearCookie("adminToken", {
            maxAge: 0,
            secure: true,
            sameSite: "none",
        })
            .status(200)
            .json({ message: "Logout successful" });
    }
    catch (error) {
        next(error);
    }
});
//get current admin
router.get("/refetch", async (req, res, next) => {
    /*
      #swagger.responses[200] = {
            description:"current admin data as per token id",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/currentAdmin"
                    }
                }
            }
        }
       #swagger.responses[401] = {
            description:"Unauthorized admin (if token not found / invalid)",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/unauthorizedAdmin"
                    }
                }
            }
        }
         #swagger.responses[404] = {
            description:"Admin not found",
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
        const { adminToken } = req.cookies;
        if (!adminToken) {
            throw new error_1.CustomError(401, "Unauthorized admin");
        }
        const decoded = jsonwebtoken_1.default.verify(adminToken, process.env.JWT_ADMIN_SECRET);
        const { _id } = decoded;
        const admin = await admin_1.default.findById(_id).select("-password");
        if (!admin) {
            throw new error_1.CustomError(404, "admin not found");
        }
        res.status(200).json({ admin });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
