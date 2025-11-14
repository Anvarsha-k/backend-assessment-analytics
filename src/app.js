import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

import { registerApp, getApiKey, revokeKey } from "./controllers/authController.js";
import { collect, getEventSummary, getUserStats } from "./controllers/analyticsController.js";
import apiKeyAuth from "./middlewares/apiKeyAuth.js";
import { rateLimiterMiddleware } from "./middlewares/rateLimit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDoc = yaml.load(path.join(__dirname, "../swagger.yaml"));

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-api-key"]
}));

app.use(express.json());

// ---------------------------
// AUTH ROUTES
// ---------------------------
app.post("/api/auth/register", registerApp);
app.get("/api/auth/api-key", getApiKey);
app.post("/api/auth/revoke", revokeKey);

// ---------------------------
// ANALYTICS ROUTES
// ---------------------------
app.post("/api/analytics/collect", apiKeyAuth, rateLimiterMiddleware, collect);
app.get("/api/analytics/event-summary", apiKeyAuth, getEventSummary);
app.get("/api/analytics/user-stats", apiKeyAuth, getUserStats);

// ---------------------------
// SWAGGER
// ---------------------------
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ---------------------------
// HEALTH CHECK
// ---------------------------
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ---------------------------
// ERROR HANDLER (CORS SAFE)
// ---------------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  res.status(500).json({ error: err.message || "Internal server error" });
});

export default app;
