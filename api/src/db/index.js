// @flow

import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../config';

const { database, username, password } = config.db;

const sequelize = new Sequelize(database, username, password, {
  ...config.db,
  operatorsAliases: false,
});

fs
  .readdirSync(path.resolve(__dirname, 'models'))
  .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
  .forEach(file => {
    let model = require(path.join(__dirname, 'models', file)); // eslint-disable-line
    if (model.default) {
      model = model.default;
    }

    if (typeof model.fields !== 'object') {
      throw new Error('Model fields not defined');
    }

    model.init(model.fields, { sequelize });

    if (typeof model.associate === 'function') {
      model.associate();
    }
  });

sequelize.sync();

module.exports = sequelize;
