import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "@/container/types";
import { IAuthenticatedRequest } from "@/shared/interfaces/overrides.interface";
import { ResponseHandler } from "@/shared/utils/response-handler";
import { IAuthService } from "../services/interfaces/auth-services.interface";

@injectable()
export class AuthController {
  constructor(
    @inject(AUTH_TYPES.AuthService) private _authService: IAuthService,
  ) {}
  // login
  login = async (req: Request, res: Response) => {
    const result = await this._authService.login(res, req.body);
    return ResponseHandler.successMessage(res, result);
  };

  // logout
  logout = async (req: Request, res: Response) => {
    const result = this._authService.logout(res);
    return ResponseHandler.successMessage(res, result);
  };

  // get login user
  getLoginUser = async (req: IAuthenticatedRequest, res: Response) => {
    const result = this._authService.getLoginUser(req);
    return ResponseHandler.success(res, result);
  };
}
