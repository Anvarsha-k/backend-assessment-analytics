import Event from "../models/Event.js";
import { Op, fn, col } from "sequelize";

// Saving Single Event to DB

export const saveEvent = async (appId, payload) => {
  const record = await Event.create({
    appId,
    event: payload.event,
    url: payload.url,
    referrer: payload.referrer,
    device: payload.device,
    ipAddress: payload.ipAddress,
    timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
    metadata: payload.metadata || {}
  });
  return record;
};


export const eventSummary = async ({ event, startDate, endDate, app_id }) => {
  const where = {};
  if (event) where.event = event;
  if (app_id) where.appId = app_id;
  if (startDate || endDate) {
    where.timestamp = {};
    if (startDate) where.timestamp[Op.gte] = new Date(startDate);
    if (endDate) where.timestamp[Op.lte] = new Date(endDate);
  }

  const count = await Event.count({ where });

  const uniqueUsers = await Event.count({
    where,
    distinct: true,
    col: "ipAddress"
  });

  const deviceRows = await Event.findAll({
    where,
    attributes: ["device", [fn("COUNT", col("device")), "cnt"]],
    group: ["device"]
  });

  const deviceData = {};
  deviceRows.forEach(r => {
    const dev = r.get("device") || "unknown";
    const cnt = parseInt(r.get("cnt"), 10) || 0;
    deviceData[dev] = cnt;
  });

  return { event: event || "all", count, uniqueUsers, deviceData };
};


export const userStats = async (userId) => {
  if (!userId) return { userId, totalEvents: 0, recent: [] };

  const events = await Event.findAll({
    where: {
      metadata: { [Op.contains]: { userId } }
    },
    order: [["timestamp", "DESC"]],
    limit: 20
  });

  return {
    userId,
    totalEvents: events.length,
    deviceDetails: events[0]?.metadata || {},
    ipAddress: events[0]?.ipAddress || null,
    recent: events.map(e => ({
      event: e.event,
      timestamp: e.timestamp,
      metadata: e.metadata
    }))
  };
};
