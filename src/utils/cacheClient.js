import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis(process.env.REDIS_URL);

export default {
  get: (k) => redis.get(k),
  set: (k, v, ttlSeconds) => ttlSeconds ? redis.set(k, v, "EX", ttlSeconds) : redis.set(k, v),
  del: (k) => redis.del(k)
};
