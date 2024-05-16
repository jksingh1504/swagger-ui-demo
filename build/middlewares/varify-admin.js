"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const admin_1 = __importDefault(require("../models/admin"));
const verifyAdmin = async (req, res, next) => {
    try {
        const { adminToken } = req.cookies;
        if (!adminToken) {
            throw new error_1.CustomError(401, "Unauthorized admin");
        }
        const decoded = jsonwebtoken_1.default.verify(adminToken, process.env.JWT_ADMIN_SECRET);
        const { _id } = decoded;
        const admin = await admin_1.default.findById(_id);
        if (!admin) {
            throw new error_1.CustomError(404, "Admin not found");
        }
        req.adminId = _id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyAdmin;
