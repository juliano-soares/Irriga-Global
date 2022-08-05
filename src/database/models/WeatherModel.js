const DataTypes = require("sequelize");
const db = require("../db");

const WeatherModel = db.define('weather', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city_id: {
    type: DataTypes.INTEGER,
  },
  temp: {
    type: DataTypes.DOUBLE,
  },
  temp_min: {
    type: DataTypes.DOUBLE,
  },
  temp_max: {
    type: DataTypes.DOUBLE,
  },
  wind_speed: {
    type: DataTypes.DOUBLE,
  },
  sunrise: {
    type: DataTypes.TIME,
  },
  sunset: {
    type: DataTypes.TIME,
  },
  rain: {
    type: DataTypes.DOUBLE,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
},{
  timestamps: false
})

module.exports = WeatherModel;