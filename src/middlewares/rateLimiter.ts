import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";

export function createRateLimiter(options?: Partial<RateLimitOptions>) {
   return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
         errorCode: "TOO_MANY_REQUESTS",
         message: "Too many requests, please try again later.",
      },
      ...options,
   });
}
