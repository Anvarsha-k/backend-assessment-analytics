import * as analyticsService from "../services/analyticsService.js";
import cache from "../utils/cacheClient.js";


 //Collect event endpoint

export const collect = async (req, res, next) => {
  try {
    const app = req.app;
    const payload = req.body;
    if (!payload || !payload.event) return res.status(400).json({ error: "event field required" });

    await analyticsService.saveEvent(app.id, payload);

    res.status(201).json({ message: "Event collected" });
  } catch (err) { next(err); }
};


 //Event brief with caching

export const getEventSummary = async (req, res, next) => {
  try {
    const event = req.query.event || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const app_id = req.query.app_id || null;

    const result = await analyticsService.eventSummary({
      event,
      startDate,
      endDate,
      app_id,
    });

    return res.json(result);
  } catch (err) {
    console.error("EVENT SUMMARY ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//Get user-level stats

export const getUserStats = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "userId required" });
    const result = await analyticsService.userStats(userId);
    res.json(result);
  } catch (err) { next(err); }
};
