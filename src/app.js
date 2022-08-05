require("dotenv").config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require("express");

class AppController {
  constructor() {
    this.express = express();
    this.routes();
    this.json();
  }

  json() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes/City"));
    this.express.use(require("./routes/Weather"));
  }
}

module.exports = new AppController().express;