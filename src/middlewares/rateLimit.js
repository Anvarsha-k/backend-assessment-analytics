import { RateLimiterMemory } from "rate-limiter-flexible";

const points = parseInt(process.env.RATE_LIMIT_POINTS || "100", 10);
const duration = parseInt(process.env.RATE_LIMIT_DURATION || "60", 10);

const limiter = new RateLimiterMemory({ points, duration });

export const rateLimiterMiddleware = (req, res, next) => {
  const key = req.headers["x-api-key"] || req.ip;
  limiter.consume(key)
    .then(() => next())
    .catch(() => res.status(429).json({ error: "Too many requests" }));
};
