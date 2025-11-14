import App from "../models/App.js";
import crypto from "crypto";

export const createApp = async (name) => {
  const apiKey = crypto.randomUUID() + "-" + crypto.randomBytes(4).toString("hex");
  const app = await App.create({ name, apiKey });
  return app;
};

export const getAppByApiKey = async (apiKey) => {
  if (!apiKey) return null;
  return App.findOne({ where: { apiKey } });
};

export const revokeApiKey = async (apiKey) => {
  return App.update({ revoked: true }, { where: { apiKey } });
};

export const regenApiKey = async (appId) => {
  const newKey = crypto.randomUUID() + "-" + crypto.randomBytes(4).toString("hex");
  await App.update({ apiKey: newKey, revoked: false }, { where: { id: appId } });
  return App.findByPk(appId);
};
