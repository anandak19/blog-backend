import { IUserData } from "@/modules/user/interface/user.interface";
import { IAuthenticatedRequest } from "@/shared/interfaces/overrides.interface";
import { Response } from "express";
import { LoginDto } from "../../schemas/login.schema";
import { SignupDto, OtpVarifyDto, OptUpdatesDto } from "../../schemas/signup.schema";
import { IOtpTimeLeft } from "../../interfaces/response.interface";


export interface IAuthService {
  // login
  login(res: Response, dto: LoginDto): Promise<string>;
  // logout
  logout(res: Response): string;
  // login user data
  getLoginUser(req: IAuthenticatedRequest): IUserData;
}

export interface ISignupService {
  // signupUser
  signup(user: SignupDto): Promise<string>;
  // varifyOtp
  varifyOtp(dto: OtpVarifyDto): Promise<string>;
  // resend otp
  resendOtp(dto: OptUpdatesDto): Promise<string>;
  // get otp time left
  getOtpTimeLeft(dto: OptUpdatesDto): Promise<IOtpTimeLeft>;
}
