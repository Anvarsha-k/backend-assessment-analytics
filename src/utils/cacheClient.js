import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redis = null;

// Only initialize Redis if REDIS_URL exists
if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL);
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection failed, disabling cache:", err.message);
    redis = null;
  }
} else {
  console.log("Redis not configured. Cache disabled.");
}

export default {
  get: async (key) => {
    if (!redis) return null;
    return redis.get(key);
  },
  set: async (key, value, ttlSeconds) => {
    if (!redis) return;
    if (ttlSeconds) return redis.set(key, value, "EX", ttlSeconds);
    return redis.set(key, value);
  },
  del: async (key) => {
    if (!redis) return;
    return redis.del(key);
  },
};
