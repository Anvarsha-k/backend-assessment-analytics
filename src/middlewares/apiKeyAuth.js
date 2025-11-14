import { getAppByApiKey } from "../services/keyService.js";

export default async function apiKeyAuth(req, res, next) {
  try {
    const key = req.headers["x-api-key"] || req.headers["authorization"];
    if (!key) return res.status(401).json({ error: "Missing API key" });

    const app = await getAppByApiKey(key);
    if (!app || app.revoked) return res.status(403).json({ error: "Invalid or revoked API key" });

    req.app = app;
    next();
  } catch (err) {
    next(err);
  }
}
