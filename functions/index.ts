import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../src/database/connectDB";
import routes from "../src/routes/routes";
import { errorHandler } from "../src/middlewares/error";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerRoutes from "../src/routes/swagger";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../src/swagger-output.json";

import ServerlessHttp from "serverless-http";

const router = express.Router();

connectDB();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

router.get("/", (req, res) => {
  res.status(200).send("welcome to ecommerce rest api");
});

router.use(routes);
router.use(errorHandler);

router.use(swaggerRoutes);

// ===========swagger=============
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ===========swagger=============

// app.listen(PORT, () => {
//   console.log(`server is listen on ${PORT}`);
//   connectDB();
// });
app.use("/.netlify/functions/index", router);
module.exports.handler = ServerlessHttp(app);
