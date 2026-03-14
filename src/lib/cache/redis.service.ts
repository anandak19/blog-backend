import { IRedisService } from "./redis-service.interface";
import { redisClient } from "./redis-client";
import { injectable } from "inversify";

@injectable()
export class RedisService implements IRedisService {
  async set(key: string, valueStore: unknown, ttl = 60): Promise<void> {
    const data = JSON.stringify(valueStore);

    await redisClient.set(key, data, {
      expiration: { type: "EX", value: ttl },
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await redisClient.get(key);

    if (!result) return null;

    return JSON.parse(result);
  }

  async del(key: string): Promise<void> {
    await redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await redisClient.exists(key) 
    return result ? true : false
  }

  async timeLeft(key: string): Promise<number> {
    const time = await redisClient.ttl(key);

    return time === -1 || time === -2 ? 0 : time;
  }
}
