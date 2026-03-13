import express from "express";
import "reflect-metadata";
import appRoutes from "./routes/index.routes";
import { errorHandler } from "./shared/middlewares/error.middleware";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRoutes);

// error
app.use(errorHandler);

export default app;
