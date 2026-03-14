import { inject, injectable } from "inversify";
import { IOtpCache, IRedisService } from "./redis-service.interface";
import { LIB_TYPES } from "../lib.types";

@injectable("Request")
export class OtpCacheService implements IOtpCache {
  private readonly OTP_CACHE_EXPIRATION_SEC = 60 * 2;
  constructor(@inject(LIB_TYPES.RedisService) private _redis: IRedisService) {}

  async getOtpTimeLeft(email: string): Promise<number> {
    return await this._redis.timeLeft(`otp:${email}`);
  }

  async cacheOtp(email: string, otp: string): Promise<void> {
    await this._redis.set(`otp:${email}`, otp, this.OTP_CACHE_EXPIRATION_SEC);
  }

  async getCachedOtp(email: string): Promise<string | null> {
    return this._redis.get<string>(`otp:${email}`);
  }
}
