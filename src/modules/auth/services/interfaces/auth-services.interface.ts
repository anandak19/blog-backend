import { Response } from "express";
import { IOtpTimeLeft } from "../../interfaces/response.interface";
import { LoginDto } from "../../schemas/login.schema";
import {
  OptUpdatesDto,
  OtpVarifyDto,
  SignupDto,
} from "../../schemas/signup.schema";
import { IUserData } from "../../../user/interface/user.interface";
import { IAuthenticatedRequest } from "../../../../shared/interfaces/overrides.interface";

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
