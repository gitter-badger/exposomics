// @flow

import Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, sequelize: Sequelize) =>
    queryInterface.createTable('WeatherRecords', {
      zipcode: {
        type: sequelize.STRING(5),
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false,
      },
      tmax: {
        type: sequelize.INTEGER,
      },
      tmin: {
        type: sequelize.INTEGER,
      },
      snow: {
        type: sequelize.INTEGER,
      },
      prcp: {
        type: sequelize.INTEGER,
      },
    }),
  down: (queryInterface: Sequelize.QueryInterface) =>
    queryInterface.dropTable('WeatherRecords'),
};
