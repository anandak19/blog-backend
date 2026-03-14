import { createClient } from "redis";
import { appConfig } from "../../config/app.config";

export const redisClient = createClient({
  username: appConfig.REDIS_USER,
  password: appConfig.REDIS_PASS,
  socket: {
    host: appConfig.REDIS_HOST,
    port: Number(appConfig.REDIS_PORT),
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("Redis connected");
};