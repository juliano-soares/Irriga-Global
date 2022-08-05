const Router = require("express");
const cityRoute = Router();

const cityController = require("../controllers/CityController");

cityRoute.get("/cities", cityController.getAllCities);

module.exports = cityRoute;