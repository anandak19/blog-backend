import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { HTTP_STATUS } from "../constants/http-status.constat";
import { inject, injectable } from "inversify";
import { LIB_TYPES } from "../../lib/lib.types";
import { IJwtService } from "../../lib/jwt/jwt-service.interface";
import { IAuthenticatedRequest } from "../interfaces/overrides.interface";
import { IUserData } from "../../modules/user/interface/user.interface";
import { COOKIE_KEY } from "../../lib/cookie/cookie.service";

@injectable()
export class AuthMiddeware {
  constructor(@inject(LIB_TYPES.JwtService) private _jwtService: IJwtService) {}

  handle = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    try {
      const decode = this._jwtService.verifyToken(token);
      Object.assign(req, decode);

      next();
    } catch (error) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
  };
}

export const authMiddleware = (jwtService: IJwtService) => {
  return async (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.cookies?.[COOKIE_KEY] as string;

    try {
      const decode = jwtService.verifyToken<IUserData>(token);
      req.user = {
        email: decode.email,
        firstName: decode.firstName,
        lastName: decode.lastName,
      };
      next();
    } catch (error) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
  };
};
