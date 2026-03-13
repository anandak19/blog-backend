export class AppError extends Error {
  statusCode: number;
  path: string;
  constructor(message: string, statusCode: number, path: string) {
    super(message);
    this.statusCode = statusCode;
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }
}
