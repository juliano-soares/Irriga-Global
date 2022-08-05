const Router = require("express");
const weatherRoute = Router();

const { WeatherController } = require("../controllers/WeatherController");
const weatherController = new WeatherController();

weatherRoute.get("/weather", weatherController.getAllInfo);
weatherRoute.get("/weather/:id", weatherController.getInfoById);

module.exports = weatherRoute;