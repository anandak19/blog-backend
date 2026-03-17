import { USER_TYPES } from "@/container/types";
import { ICookieService } from "@/lib/cookie/cookie-service.interface";
import { IJwtService } from "@/lib/jwt/jwt-service.interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { IUserData } from "@/modules/user/interface/user.interface";
import { IUserService } from "@/modules/user/services/interfaces/user-service.interface";
import { HTTP_STATUS } from "@/shared/constants/http-status.constat";
import { AppError } from "@/shared/errors/app-error";
import { IAuthenticatedRequest } from "@/shared/interfaces/overrides.interface";
import { inject, injectable } from "inversify";
import { LoginDto } from "../schemas/login.schema";
import { IAuthService } from "./interfaces/auth-services.interface";
import { Response } from "express";
import { IBaseResponse } from "@/shared/interfaces/http-response.interface";

@injectable()
export class AuthService implements IAuthService {
  private readonly tokenExpirationtime = 60 * 60 * 24 * 5;
  constructor(
    @inject(USER_TYPES.UserService) private _userService: IUserService,
    @inject(LIB_TYPES.JwtService) private _jwtService: IJwtService,
    @inject(LIB_TYPES.CookieService) private _cookieService: ICookieService,
  ) {}

  getLoginUser(req: IAuthenticatedRequest): IUserData {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    return req.user;
  }

  async login(res: Response, dto: LoginDto): Promise<IUserData> {
    const user = await this._userService.comparePassword(dto);
    const token = this._jwtService.getSignedToken(
      user,
      this.tokenExpirationtime,
    );
    this._cookieService.setCookie(res, token, this.tokenExpirationtime);

    return user;
  }

  logout(res: Response): string {
    this._cookieService.clearCookie(res);
    return "Logout Success";
  }
}
