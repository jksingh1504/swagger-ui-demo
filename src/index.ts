import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/connectDB";
import routes from "./routes/routes";
import { errorHandler } from "./middlewares/error";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerRoutes from "./routes/swagger";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";

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

app.get("/", (req, res) => {
  res.status(200).send("welcome to ecommerce rest api");
});

app.use(routes);
app.use(errorHandler);

app.use(swaggerRoutes);

// ===========swagger=============
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ===========swagger=============

app.listen(PORT, () => {
  console.log(`server is listen on ${PORT}`);
  connectDB();
});
