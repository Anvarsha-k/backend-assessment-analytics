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

app.use(cors());
app.use(express.json());

// Auth
app.post("/api/auth/register", registerApp);
app.get("/api/auth/api-key", getApiKey);
app.post("/api/auth/revoke", revokeKey);

// Analytics
app.post("/api/analytics/collect", apiKeyAuth, rateLimiterMiddleware, collect);
app.get("/api/analytics/event-summary", apiKeyAuth, getEventSummary);
app.get("/api/analytics/user-stats", apiKeyAuth, getUserStats);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

export default app;
