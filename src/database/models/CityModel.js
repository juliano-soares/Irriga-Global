const DataTypes = require("sequelize");
const db = require("../db");

const CityModel = db.define('cities', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.DECIMAL,
  },
  gmt: {
    type: DataTypes.INTEGER,
  },
},{
    timestamps: false
});

module.exports = CityModel;