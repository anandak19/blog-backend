import { IOtpTimeLeft } from "../../interfaces/response.interface";
import {
  OptUpdatesDto,
  OtpVarifyDto,
  SignupDto,
} from "../../schemas/signup.schema";

export interface IAuthService {}

export interface ISignupService {
  // signupUser
  signup(user: SignupDto): Promise<string>;
  // varifyOtp
  varifyOtp(dto: OtpVarifyDto): Promise<string>;
  // resend otp
  resendOtp(dto: OptUpdatesDto): Promise<string>;
  // get otp time left
  getOtpTimeLeft(dto: OptUpdatesDto): Promise<IOtpTimeLeft>
}
