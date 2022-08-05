const axios = require("axios");
const WeatherModel = require("../database/models/WeatherModel");
const CityModel = require("../database/models/CityModel");
const db = require("../database/db");

class WeatherController {
  async getAllInfo(request, response) {
    try {
      await cityInfos();
      return response.status(201).send();
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  async getInfoById(request, response) {
    try {
      const { id } = request.params;
      const weather = await cityInfos(id);
      return response.status(201).json(weather);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
  
  static async searchDataWeatherForCity(city) {
    try {
      if(!city.latitude || !city.longitude ) {
        const auxCity = await axios.get(
          process.env.API_URL_GETCITY,{params: {
            q: city.name,
            limit: 1,
            appid: process.env.API_KEY_WEATHER
          }}
        );
        
        city.latitude = auxCity.data[0].lat;
        city.longitude = auxCity.data[0].lon;
      }
  
      const { data } = await axios.get(process.env.API_URL_WEATHER, {params: {
        lat: city.latitude,
        lon: city.longitude,
        appid: process.env.API_KEY_WEATHER,
        exclude: 'current,minutely',
        units: 'metric',
      }});
  
      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }

  static async saveWeather(idCity, dataWeather) {
    const transaction = await db.transaction()
    try {
      const weather = await WeatherModel.create({
        city_id: idCity,
        temp: dataWeather.hourly[0].temp,
        temp_max: dataWeather.daily[0].temp.max,
        temp_min: dataWeather.daily[0].temp.min,
        wind_speed: dataWeather.hourly[0].wind_speed,
        sunrise: new Date(dataWeather.daily[0].sunrise).toLocaleTimeString('pt-BR'),
        sunset: new Date(dataWeather.daily[0].sunset).toLocaleTimeString('pt-BR'),
        rain: dataWeather.hourly[0].rain ? dataWeather.hourly[0].rain['1h'] : 0,
        created_at: Date.now(),
      }, { transaction: transaction, raw: true });
      transaction.commit();
      return weather;
    } catch (error) {
      transaction.rollback();
      return console.log(error.message)
    }
  }
}

async function cityInfos(id) {
  try {
    if(!id) {
      const cities = await CityModel.findAll({raw : true});
      for(const city of cities) {
        const dataWeather = await WeatherController.searchDataWeatherForCity(city);
        if(dataWeather) {
          await WeatherController.saveWeather(city.id, dataWeather);
        }
      };
    } else {
      const city = await CityModel.findOne({
        where: {
          id: id,
        },
        raw : true
      });

      if (city === null) {
        throw new Error("city ​​not found");
      }

      const dataWeather = await WeatherController.searchDataWeatherForCity(city);
      const weather = await WeatherController.saveWeather(city.id, dataWeather);
      return weather;
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {WeatherController, cityInfos} ;