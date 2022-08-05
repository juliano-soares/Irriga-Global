'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("cities", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.DECIMAL,
      },
      gmt: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("cities");
  }
};