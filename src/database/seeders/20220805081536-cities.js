'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('cities', 
    [
      {
        name: 'Santa Maria',
        latitude: '-29.6841666667',
        longitude: '-53.8069444444',
        gmt: -3,
      },
      {
        name: 'Campo Grande',
        latitude: '-20.4427777778',
        longitude: '-54.6463888889',
        gmt: -4,
      },
      {
        name: 'Deutsch Jahrndorf',
        latitude: '48.0086111111',
        longitude: '17.1097222222',
        gmt: 2,
      },
      {
        name: 'Três de Maio',
        latitude: null,
        longitude: null,
        gmt: -3,
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('cities', null, {}),
};
