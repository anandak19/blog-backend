import { HTTP_STATUS } from "../constants/http-status.constat";

export class AppError extends Error {
  statusCode: number;
  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
