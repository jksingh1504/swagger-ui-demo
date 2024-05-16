"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("database is connected sucessfully");
    }
    catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error);
    }
};
exports.connectDB = connectDB;
