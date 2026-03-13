
import { Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.constat";
import { ISuccessResponse, HttpResponse } from "../interfaces/http-response.interface";

export class ResponseHandler {
  static success<T>(
    res: Response,
    data: T,
    message = "success",
    statusCode = HTTP_STATUS.OK,
  ) {
    const response: ISuccessResponse<T> = {
      message,
      statusCode,
      success: true,
      timestamp: new Date().toISOString(),
      data: data,
    };

    return res.status(statusCode).json(response);
  }

  static successMessage(
    res: Response,
    message = "success",
    statusCode = HTTP_STATUS.OK,
  ) {
    const response: HttpResponse = {
      message,
      statusCode,
      success: true,
      timestamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(response);
  }
}
