import { NextFunction, Request, Response } from "express";
import z from "zod";
import { AppError } from "../errors/app-error";
import { HTTP_STATUS } from "../constants/http-status.constat";

export enum ValidationSource {
  BODY = "body",
  QUERY = "query",
  HEADER = "header",
  PARAM = "params",
}

const ValidateSchema = (
  schema: z.ZodType,
  source: ValidationSource = ValidationSource.BODY,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const firstError = result.error.issues[0];
      const field = firstError.path.join(".");

      return next(
        new AppError(
          `${field}: ${firstError.message}`,
          HTTP_STATUS.BAD_REQUEST,
        ),
      );
    }

    req[source] = result.data;

    next();
  };
};

export default ValidateSchema;
