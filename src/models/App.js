import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const App = sequelize.define("App", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  apiKey: { type: DataTypes.STRING, allowNull: false, unique: true },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "apps",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});

export default App;
