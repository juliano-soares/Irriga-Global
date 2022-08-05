const { cityInfos } = require("../controllers/WeatherController");

const cronJob = require("cron").CronJob;

const myJob = new cronJob('1 */30 * * * *', async () => {
  console.log("Routine is running!");
  await cityInfos();
  console.log("Routine is finished!");
});

myJob.start();