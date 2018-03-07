// @flow

import moment from 'moment';
import { Op } from 'sequelize';
import ExposomicsLocationManager from '@doc.ai/exposomics-common/lib/utils/ExposomicsLocationManager';
import { models } from '../db';

const { WeatherRecord } = models;

/**
 * This function accepts a list of places (json) and returns data to be rendered by the React component

 * @param {Place[]} places A json object of location and time data from the Google Api

 * @return {Object}
 * @property {moment} result.startDate
 * @property {moment} result.endDate
 * @property {Array} result.dataList
 */
export default async (
  locationManager: ExposomicsLocationManager
): Promise<Object> => {
  const batchQueryLogic = async function batchQueryLogic({
    location,
    startDate,
    endDate,
  }) {
    let result;
    try {
      result = await WeatherRecord.findAll({
        attributes: ['zipcode', 'date', 'tmin', 'tmax', 'snow', 'prcp'],
        where: {
          date: {
            [Op.and]: [{ [Op.gt]: startDate }, { [Op.lt]: endDate }],
          },
          zipcode: location.getZipcode(),
        },
      });
      // console.log('result is: ');
      // console.log(result);
    } catch (e) {
      console.log('database error.');
      console.log(e);
    }

    let retArray;
    if (!result || !result.length) {
      retArray = Array(endDate.diff(startDate, 'days')).fill(-202);
    } else {
      retArray = [];
      for (const r of result) {
        retArray.push({
          date: moment(String(r.date), 'YYYY-MM-DD'),
          tempLow: r.tmin === null ? null : r.tmin / 10,
          tempHigh: r.tmax === null ? null : r.tmax / 10,
          snow: r.snow === null ? null : r.snow / 10,
          precipitation: r.prcp === null ? null : r.prcp / 10,
        });
      }
    }

    return retArray;
  };

  const result = { tempLow: [], tempHigh: [], snow: [], precipitation: [] };
  for (const l of locationManager.locationObjects) {
    const locationResults = await batchQueryLogic(l);

    for (const r of locationResults) {
      Object.keys(r).forEach(key => {
        if (key !== 'date') {
          result[key].push({
            date: r.date,
            value: r[key],
          });
        }
      });
    }
  }

  return result;
};
