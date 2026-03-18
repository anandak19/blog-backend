import { NextFunction, Request, Response } from "express";
import { upload } from "./upload.middleware";
import { AppError } from "../errors/app-error";
import { MulterError } from "multer";

export const optionalImageUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.includes("multipart/form-data")) {
    return next();
  }

  //run multer
  const middleware = upload.single("image");

  middleware(req, res, (err) => {
    if (err) {
      if (err instanceof Error || err instanceof MulterError) {
        next(new AppError(err.message));
      }

      next(new AppError("Unknown upload error"));
    }

    next();
  });
};
