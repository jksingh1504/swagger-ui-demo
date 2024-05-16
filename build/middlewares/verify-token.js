"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const user_1 = __importDefault(require("../models/user"));
const verifyToken = async (req, res, next) => {
    try {
        const { userToken } = req.cookies;
        if (!userToken) {
            throw new error_1.CustomError(401, "Unauthorized user");
        }
        const decoded = jsonwebtoken_1.default.verify(userToken, process.env.JWT_SECRET);
        const { _id } = decoded;
        const user = await user_1.default.findById(_id);
        if (!user) {
            throw new error_1.CustomError(404, "User not found");
        }
        req.userId = _id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyToken;
