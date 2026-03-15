import { appConfig } from "@/config/app.config";
import { Response } from "express";
import { ICookieService } from "./cookie-service.interface";


export const COOKIE_KEY = "access-token";

export class CookieService implements ICookieService {
  private readonly _environment = appConfig.NODE_ENV || "dev";
  private readonly _isProd = this._environment === "prod";

  setCookie(res: Response, value: string, maxAgeInSeconds: number): void {
    res.cookie(COOKIE_KEY, value, {
      httpOnly: true,
      secure: this._isProd,
      sameSite: this._isProd ? "none" : "lax",
      path: "/",
      maxAge: maxAgeInSeconds * 1000,
    });
  }

  clearCookie(res: Response): void {
    res.clearCookie(COOKIE_KEY, {
      httpOnly: true,
      secure: this._isProd,
      path: "/",
      sameSite: this._isProd ? "none" : "lax",
    });
  }
}
