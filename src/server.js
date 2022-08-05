const app = require("./app");

require("./database/db");
require("./jobs/WeatherJob");

app.listen(3333, () => {
  console.log("Server is running on the port: 3333!");
});