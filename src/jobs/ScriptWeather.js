const weatherController = require("../controllers/WeatherController");

const script = () => {
  let command = process.argv[2];
  if(command) {
    weatherController.cityInfos(command);
  } else {
    weatherController.cityInfos();
  }
};

script();