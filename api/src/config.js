// @flow

import dotenv from 'dotenv';
import rc from 'rc';

dotenv.config();

export default rc('exposomics', {
  port: 3001,
  db: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'exposomics_dev',
  },
});
