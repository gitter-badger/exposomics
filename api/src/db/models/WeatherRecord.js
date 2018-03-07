// @flow

import Sequelize from 'sequelize';

export type WeatherRecordType = {
  zipcode: number,
  date: Date,
  tmax: number,
  tmin: number,
  snow: number,
  prcp: number,
};

export default class WeatherRecord extends Sequelize.Model<
  WeatherRecordType,
  WeatherRecordType
> {
  static fields = {
    zipcode: Sequelize.STRING(5),
    date: Sequelize.DATEONLY,
    tmax: Sequelize.INTEGER,
    tmin: Sequelize.INTEGER,
    snow: Sequelize.INTEGER,
    prcp: Sequelize.INTEGER,
  };
}
