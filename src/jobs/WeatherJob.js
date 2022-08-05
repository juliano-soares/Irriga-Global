const { cityInfos } = require("../controllers/WeatherController");

const cronJob = require("cron").CronJob;

const myJob = new cronJob('1 30 * * * *', async () => {
  await cityInfos();
});

myJob.start();