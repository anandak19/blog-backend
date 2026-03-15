import { AUTH_TYPES } from "@/container/types";
import { ResponseHandler } from "@/shared/utils/response-handler";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ISignupService } from "../services/interfaces/auth-services.interface";


@injectable()
export class SignupController {
  constructor(
    @inject(AUTH_TYPES.SignupService) private _signupService: ISignupService,
  ) {}

  // save user data
  saveUserData = async (req: Request, res: Response) => {
    const result = await this._signupService.signup(req.body);
    return ResponseHandler.successMessage(res, result);
  };

  // varify otp
  verifyOtp = async (req: Request, res: Response) => {
    const result = await this._signupService.varifyOtp(req.body);
    return ResponseHandler.successMessage(res, result);
  };

  // resend otp
  resendOtp = async (req: Request, res: Response) => {
    const result = await this._signupService.resendOtp(req.body);
    return ResponseHandler.successMessage(res, result);
  };
  // get otp remaining time
  getOtpTimeLeft = async (req: Request, res: Response) => {
    const result = await this._signupService.getOtpTimeLeft(req.body)
    return ResponseHandler.success(res, result)
  }
}
