import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import appRoutes from "./routes/index.routes";
import cors from "cors";
import { errorHandler } from "./shared/middlewares/error.middleware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api", appRoutes);

// error
app.use(errorHandler);

export default app;
