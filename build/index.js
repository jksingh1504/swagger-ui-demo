"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB_1 = require("./database/connectDB");
const routes_1 = __importDefault(require("./routes/routes"));
const error_1 = require("./middlewares/error");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./routes/swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.status(200).send("welcome to ecommerce rest api");
});
app.use(routes_1.default);
app.use(error_1.errorHandler);
app.use(swagger_1.default);
// ===========swagger=============
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
// ===========swagger=============
app.listen(PORT, () => {
    console.log(`server is listen on ${PORT}`);
    (0, connectDB_1.connectDB)();
});
