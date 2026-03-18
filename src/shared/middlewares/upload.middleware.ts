import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { AppError } from "../errors/app-error";
import { HTTP_STATUS } from "../constants/http-status.constat";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError("Only images are allowed", HTTP_STATUS.BAD_REQUEST));
      return;
    }

    cb(null, true);
  },
});
