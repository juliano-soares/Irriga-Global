require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const config = require("../config/database");
const Sequelize = require("sequelize");

const db = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

module.exports = db;