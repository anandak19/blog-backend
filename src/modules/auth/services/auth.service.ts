import { inject, injectable } from "inversify";
import { IAuthService } from "./interfaces/auth-services.interface";
import { LoginDto } from "../schemas/login.schema";
import { AUTH_TYPES, USER_TYPES } from "../../../container/types";
import { IUserService } from "../../user/services/interfaces/user-service.interface";
import { LIB_TYPES } from "../../../lib/lib.types";
import { IJwtService } from "../../../lib/jwt/jwt-service.interface";
import { ICookieService } from "../../../lib/cookie/cookie-service.interface";
import { Response } from "express";

@injectable()
export class AuthService implements IAuthService {
  private readonly tokenExpirationtime = 60 * 60 * 24 * 5;
  constructor(
    @inject(USER_TYPES.UserService) private _userService: IUserService,
    @inject(LIB_TYPES.JwtService) private _jwtService: IJwtService,
    @inject(LIB_TYPES.CookieService) private _cookieService: ICookieService,
  ) {}

  async login(res: Response, dto: LoginDto): Promise<string> {
    const user = await this._userService.comparePassword(dto);
    const token = this._jwtService.getSignedToken(
      user,
      this.tokenExpirationtime,
    );
    this._cookieService.setCookie(res, token, this.tokenExpirationtime);

    return "Login successfull";
  }

  logout(res: Response): string {
    this._cookieService.clearCookie(res);
    return "Logout Success";
  }
}
