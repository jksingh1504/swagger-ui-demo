"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
};
exports.errorHandler = errorHandler;
class CustomError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
