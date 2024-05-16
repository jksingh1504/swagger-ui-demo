"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Set up multer middleware to handle file uploads
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});
exports.default = upload;
