const CityModel = require("../database/models/CityModel");

class CityController {
  async getAllCities(req, res) {
    try {
      const cities = await CityModel.findAll();
      return res.status(200).json(cities);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new CityController();