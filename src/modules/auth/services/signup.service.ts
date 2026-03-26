import { USER_TYPES } from "@/container/types";
import { IOtpCache, IUserCache } from "@/lib/cache/redis-service.interface";
import { IEmailService } from "@/lib/email/email-service-interface";
import { LIB_TYPES } from "@/lib/lib.types";
import { IUserService } from "@/modules/user/services/interfaces/user-service.interface";
import { generateOtpHtml } from "@/shared/constants/email-template";
import { HTTP_STATUS } from "@/shared/constants/http-status.constat";
import { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import { IOtpTimeLeft } from "../interfaces/response.interface";
import { OptUpdatesDto, OtpVarifyDto, SignupDto } from "../schemas/signup.schema";
import { ISignupService } from "./interfaces/auth-services.interface";
import { AUTH_MESSAGES } from "../constants/auth-messages.constant";


@injectable()
export class SignupService implements ISignupService {
  constructor(
    @inject(LIB_TYPES.OtpCacheService) private _otpCache: IOtpCache,
    @inject(LIB_TYPES.UserCacheService) private _userCache: IUserCache,
    @inject(LIB_TYPES.EmailService) private _email: IEmailService,
    @inject(USER_TYPES.UserService) private _userService: IUserService,
  ) {}

  async getOtpTimeLeft(dto: OptUpdatesDto): Promise<IOtpTimeLeft> {
    const timeLeft = await this._otpCache.getOtpTimeLeft(dto.email);

    return { timeLeft };
  }

  // resend otp
  async resendOtp(dto: OptUpdatesDto): Promise<string> {
    const timeLeft = await this._otpCache.getOtpTimeLeft(dto.email);
    if (timeLeft > 0) {
      throw new AppError(
        `${timeLeft}s left to resend`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const currUser = await this._userCache.getCacheUser(dto.email);
    if (!currUser) {
      throw new AppError(
        AUTH_MESSAGES.SIGNUP.SESSION_EXPIRED,
        HTTP_STATUS.FORBIDDEN,
      );
    }

    const otp = this._generateOtp();

    this._email.sendEmail({
      html: generateOtpHtml(otp),
      recipient: dto.email,
      subject: AUTH_MESSAGES.EMAIL_VERIFICATION.TITLE,
    });

    await this._otpCache.cacheOtp(dto.email, otp);

    return AUTH_MESSAGES.OTP.RESENT;
  }

  // verify otp
  async varifyOtp(dto: OtpVarifyDto): Promise<string> {
    const currUser = await this._userCache.getCacheUser(dto.email);
    if (!currUser) {
      throw new AppError(
        AUTH_MESSAGES.SIGNUP.SESSION_EXPIRED,
        HTTP_STATUS.FORBIDDEN,
      );
    }

    const otp = await this._otpCache.getCachedOtp(dto.email);
    if (!otp) {
      throw new AppError(AUTH_MESSAGES.OTP.EXPIRED, HTTP_STATUS.BAD_REQUEST);
    }

    if (otp !== dto.otp) {
      throw new AppError(AUTH_MESSAGES.OTP.INVALID, HTTP_STATUS.BAD_REQUEST);
    }

    this._userCache.deleteUser(dto.email);

    await this._userService.create(currUser);

    return AUTH_MESSAGES.SIGNUP.SUCCESS;
  }

  // varify user data and send otp
  async signup(user: SignupDto): Promise<string> {
    const exists = await this._userService.isEmailExists(user.email);
    if (exists) {
      throw new AppError(AUTH_MESSAGES.SIGNUP.USER_EXISTS, HTTP_STATUS.CONFLICT);
    }
    const otp = this._generateOtp();

    this._email.sendEmail({
      html: generateOtpHtml(otp),
      recipient: user.email,
      subject: AUTH_MESSAGES.EMAIL_VERIFICATION.TITLE,
    });

    await Promise.all([
      this._otpCache.cacheOtp(user.email, otp),
      this._userCache.cacheUser(user.email, user),
    ]);

    return AUTH_MESSAGES.OTP.SENT;
  }

  private _generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, 4);
  }
}
