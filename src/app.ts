import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import appRoutes from "./routes/index.routes";
import { errorHandler } from "./shared/middlewares/error.middleware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", appRoutes);

// error
app.use(errorHandler);

export default app;
