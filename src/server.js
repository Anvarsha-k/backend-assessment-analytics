import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./db/sequelize.js";

const PORT = process.env.PORT || 10000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log(" Models synced");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();