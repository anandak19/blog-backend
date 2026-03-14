import { Response } from "express";

export interface ICookieService {
  setCookie(
    res: Response,
    value: string,
    maxAgeInSeconds: number,
  ): void;

  clearCookie(res: Response): void;
}
