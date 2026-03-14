export interface IRedisService {
  set(key: string, value: unknown, ttl?: number): Promise<void>;

  get<T>(key: string): Promise<T | null>;

  del(key: string): Promise<void>;

  exists(key: string): Promise<boolean>;

  timeLeft(key: string): Promise<number>
}
