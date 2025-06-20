import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";
import Redis from "ioredis";
import RedisStore from "rate-limit-redis";
import type { RedisReply } from "rate-limit-redis";

const redisClient = new Redis({
   host: process.env.REDIS_HOST,
   port: parseInt(process.env.REDIS_PORT || "6379"),
   password: process.env.REDIS_PASSWORD,
});

export const authGlobalLimiter = rateLimit({
   store: new RedisStore({
      sendCommand: (...args: [string, ...(string | number | Buffer)[]]): Promise<RedisReply> => {
         return redisClient.call.apply(redisClient, args) as unknown as Promise<RedisReply>;
      },
   }),
   windowMs: 15 * 60 * 1000,
   max: 20,
   standardHeaders: true,
   legacyHeaders: false,
   message: {
      errorCode: "TOO_MANY_REQUEST",
   },
});
