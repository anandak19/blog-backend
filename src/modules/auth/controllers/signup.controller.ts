import { AUTH_TYPES } from "@/container/types";
import { ResponseHandler } from "@/shared/utils/response-handler";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ISignupService } from "../services/interfaces/auth-services.interface";
import { OptUpdatesDto, OtpVarifyDto, SignupDto } from "../schemas/signup.schema";


@injectable()
export class SignupController {
  constructor(
    @inject(AUTH_TYPES.SignupService) private _signupService: ISignupService,
  ) {}

  // save user data
  saveUserData = async (req: Request, res: Response) => {
    const userData = req.validated.body as SignupDto
    const result = await this._signupService.signup(userData);
    return ResponseHandler.successMessage(res, result);
  };

  // varify otp
  verifyOtp = async (req: Request, res: Response) => {
    const otpData = req.validated.body as OtpVarifyDto
    const result = await this._signupService.varifyOtp(otpData);
    return ResponseHandler.successMessage(res, result);
  };

  // resend otp
  resendOtp = async (req: Request, res: Response) => {
    const otpUpdates = req.validated.body as OptUpdatesDto
    const result = await this._signupService.resendOtp(otpUpdates);
    return ResponseHandler.successMessage(res, result);
  };
  
  // get otp remaining time
  getOtpTimeLeft = async (req: Request, res: Response) => {
    const otpUpdates = req.validated.body as OptUpdatesDto
    const result = await this._signupService.getOtpTimeLeft(otpUpdates)
    return ResponseHandler.success(res, result)
  }
}
