import * as keyService from "../services/keyService.js";

//Register a new app and return API key

 export const registerApp = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });

    const app = await keyService.createApp(name);
    res.status(201).json({ message: "App registered", app });
  } catch (err) { next(err); }
};

// Get API key by app id

export const getApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(400).json({ error: "API key missing in header" });
    }
    // For demo: return app object
    const app = await keyService.getAppByApiKey(apiKey);
    if (!app) return res.status(404).json({ error: "App not found" });
    res.json({ apiKey: app.apiKey
      
     });
  } catch (err) { next(err); }
};

//Revoke a  key

export const revokeKey = async (req, res, next) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey) return res.status(400).json({ error: "apiKey required" });
    await keyService.revokeApiKey(apiKey);
    res.json({ message: "API key revoked" });
  } catch (err) { next(err); }
};
