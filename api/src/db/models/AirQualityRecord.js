// @flow

import Sequelize from 'sequelize';

export type AirQualityRecordType = {
  state: string,
  county: string,
  date: Date,
  aqi: number,
};

export default class AirQualityRecord extends Sequelize.Model<
  AirQualityRecordType,
  AirQualityRecordType
> {
  static fields = {
    state: Sequelize.STRING,
    county: Sequelize.STRING,
    date: Sequelize.DATEONLY,
    aqi: Sequelize.INTEGER,
  };
}
