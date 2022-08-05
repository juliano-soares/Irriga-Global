'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("weather", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cities', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      temp: {
        type: Sequelize.DOUBLE,
      },
      temp_min: {
        type: Sequelize.DOUBLE,
      },
      temp_max: {
        type: Sequelize.DOUBLE,
      },
      wind_speed: {
        type: Sequelize.DOUBLE,
      },
      sunrise: {
        type: Sequelize.TIME,
      },
      sunset: {
        type: Sequelize.TIME,
      },
      rain: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("weather");
  }
};
