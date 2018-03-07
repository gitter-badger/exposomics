// @flow

import Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, sequelize: Sequelize) =>
    queryInterface.createTable('AirQualityRecords', {
      state: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      county: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: sequelize.DATEONLY,
        primaryKey: true,
        allowNull: false,
      },
      aqi: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
    }),
  down: (queryInterface: Sequelize.QueryInterface) =>
    queryInterface.dropTable('AirQualityRecords'),
};
