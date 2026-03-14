import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.constat";
import { IErrorResponse } from "../interfaces/http-response.interface";
import { AppError } from "../errors/app-error";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  const errorResponse: IErrorResponse = {
    message,
    statusCode,
    success: false,
    path: req.baseUrl,
    timestamp: new Date().toISOString(),
  };
  console.log(err);

  res.status(statusCode).json(errorResponse);
};
