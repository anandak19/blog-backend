import { SignupDto } from "@/modules/auth/schemas/signup.schema";

export interface IRedisService {
  set(key: string, value: unknown, ttl?: number): Promise<void>;

  get<T>(key: string): Promise<T | null>;

  del(key: string): Promise<void>;

  exists(key: string): Promise<boolean>;

  timeLeft(key: string): Promise<number>
}

export interface IOtpCache{
  getOtpTimeLeft(email: string): Promise<number>

  cacheOtp(email: string, otp: string): Promise<void>;

  getCachedOtp(email: string): Promise<string | null>
}

export interface IUserCache{
  cacheUser(email: string, user: SignupDto): Promise<void>

  getCacheUser(email: string): Promise<SignupDto | null>;

  deleteUser(email: string): Promise<void>
}
