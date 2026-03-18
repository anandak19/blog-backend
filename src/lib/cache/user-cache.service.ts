import { inject, injectable } from "inversify";
import { SignupDto } from "@/modules/auth/schemas/signup.schema";
import { LIB_TYPES } from "../lib.types";
import { IUserCache, IRedisService } from "./redis-service.interface";


@injectable("Request")
export class UserCacheService implements IUserCache {
  constructor(@inject(LIB_TYPES.RedisService) private _redis: IRedisService) {}

  async getCacheUser(email: string): Promise<SignupDto | null> {
    return await this._redis.get<SignupDto>(`user:${email}`);
  }

  async cacheUser(email: string, user: SignupDto): Promise<void> {
    await this._redis.set(`user:${email}`, user, 60 * 30);
  }

  async deleteUser(email: string): Promise<void> {
    await this._redis.del(`user:${email}`);
  }
}
