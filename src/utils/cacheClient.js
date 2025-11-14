import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redis = null;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
  console.log("Redis connected");
} else {
  console.log("Redis not configured. Cache disabled.");
}

export default {
  get: (k) => redis ? redis.get(k) : null,
  set: (k, v, ttlSeconds) => redis ? (ttlSeconds ? redis.set(k, v, "EX", ttlSeconds) : redis.set(k, v)) : null,
  del: (k) => redis ? redis.del(k) : null
};
