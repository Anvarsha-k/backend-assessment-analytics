import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import App from "./App.js";

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  appId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "apps", key: "id" }
  },
  event: { type: DataTypes.STRING, allowNull: false },
  url: DataTypes.STRING,
  referrer: DataTypes.STRING,
  device: DataTypes.STRING,
  ipAddress: DataTypes.STRING,
  timestamp: DataTypes.DATE,
  metadata: DataTypes.JSONB
}, {
  tableName: "events",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  indexes: [
    { fields: ["appId", "event", "timestamp"] },
    { fields: ["ipAddress"] }
  ]
});


App.hasMany(Event, { foreignKey: "appId", onDelete: "CASCADE" });
Event.belongsTo(App, { foreignKey: "appId" });

export default Event;
